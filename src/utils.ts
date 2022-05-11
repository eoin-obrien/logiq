export type UnaryConnective<T, R> = (p: T) => R;
export type BinaryConnective<T, R> = (p: T, q: T) => R;
export type VariadicBinaryConnective<T, R> = (p: T, q: T, ...args: T[]) => R;

export interface Connectives<T, R> {
	not: UnaryConnective<T, R>;
	and: VariadicBinaryConnective<T, R>;
	or: VariadicBinaryConnective<T, R>;
	imply: VariadicBinaryConnective<T, R>;
	xor: VariadicBinaryConnective<T, R>;
	nand: VariadicBinaryConnective<T, R>;
	nor: VariadicBinaryConnective<T, R>;
	nimply: VariadicBinaryConnective<T, R>;
	xnor: VariadicBinaryConnective<T, R>;
}

export interface PresetConnectives<T, R> {
	not: UnaryConnective<T, R>;
	and: BinaryConnective<T, R>;
	or: BinaryConnective<T, R>;
	imply?: BinaryConnective<T, R>;
	xor?: BinaryConnective<T, R>;
	nand?: BinaryConnective<T, R>;
	nor?: BinaryConnective<T, R>;
	nimply?: BinaryConnective<T, R>;
	xnor?: BinaryConnective<T, R>;
}

function toVariadic<T, R extends T>(
	connective: BinaryConnective<T, R>,
): VariadicBinaryConnective<T, R> {
	return (p: T, q: T, ...args: T[]): R => {
		let result = connective(p, q);

		// Apply connective from left to right
		for (const arg of args) {
			result = connective(result, arg);
		}

		return result;
	};
}

export function makeConnectives<T, R extends T>(
	presets: PresetConnectives<T, R>,
): Connectives<T, R> {
	const {not, and, or} = presets;
	const xor = (p: T, q: T) => and(or(not(p), not(q)), or(p, q));
	const imply = (p: T, q: T) => or(not(p), q);
	const nand = (p: T, q: T) => not(and(p, q));
	const nor = (p: T, q: T) => not(or(p, q));
	const xnor = (p: T, q: T) => not(xor(p, q));
	const nimply = (p: T, q: T) => not(imply(p, q));

	return {
		not,
		and: toVariadic(and),
		or: toVariadic(or),
		xor: toVariadic(presets.xor ?? xor),
		imply: toVariadic(presets.imply ?? imply),
		nand: toVariadic(presets.nand ?? nand),
		nor: toVariadic(presets.nor ?? nor),
		xnor: toVariadic(presets.xnor ?? xnor),
		nimply: toVariadic(presets.nimply ?? nimply),
	};
}
