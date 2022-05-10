import {SetRequired} from 'type-fest';

export type UnaryConnective<T, R> = (p: T) => R;
export type BinaryConnective<T, R> = (p: T, q: T) => R;

export interface Connectives<T, R> {
	not: UnaryConnective<T, R>;
	and: BinaryConnective<T, R>;
	or: BinaryConnective<T, R>;
	imply: BinaryConnective<T, R>;
	xor: BinaryConnective<T, R>;
	nand: BinaryConnective<T, R>;
	nor: BinaryConnective<T, R>;
	nimply: BinaryConnective<T, R>;
	xnor: BinaryConnective<T, R>;
}

export type PresetConnectives<T, R> = SetRequired<
	Partial<Connectives<T, R>>,
	'not' | 'and' | 'or'
>;

export function makeConnectives<T, R extends T>(
	presets: PresetConnectives<T, R>,
): Connectives<T, R> {
	const {not, and, or} = presets;
	const xor = presets.xor ?? ((p, q) => and(or(not(p), not(q)), or(p, q)));
	const imply = presets.imply ?? ((p, q) => or(not(p), q));
	const nand = presets.nand ?? ((p, q) => not(and(p, q)));
	const nor = presets.nor ?? ((p, q) => not(or(p, q)));
	const xnor = presets.xnor ?? ((p, q) => not(xor(p, q)));
	const nimply = presets.nimply ?? ((p, q) => not(imply(p, q)));

	return {not, and, or, xor, imply, nand, nor, xnor, nimply};
}
