export type UnaryConnective<T, R> = (p: T) => R;
export type BinaryConnective<T, R> = (p: T, q: T) => R;
export type VariadicBinaryConnective<T, R> = (p: T, q: T, ...args: T[]) => R;

type UnaryConnectiveNames = 'not';
type BinaryConnectiveNames =
	| 'and'
	| 'or'
	| 'imply'
	| 'xor'
	| 'nand'
	| 'nor'
	| 'nimply'
	| 'xnor';

type UnaryConnectives<T, R> = {
	[k in UnaryConnectiveNames]: UnaryConnective<T, R>;
};

type BinaryConnectives<T, R> = {
	[k in BinaryConnectiveNames]: BinaryConnective<T, R>;
};

type VariadicBinaryConnectives<T, R> = {
	[k in BinaryConnectiveNames]: VariadicBinaryConnective<T, R>;
};

export interface Connectives<T, R>
	extends UnaryConnectives<T, R>,
		VariadicBinaryConnectives<T, R> {}

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

export interface MakeConnectivesArgs<T, R>
	extends UnaryConnectives<T, R>,
		Pick<BinaryConnectives<T, R>, 'and' | 'or'>,
		Partial<Omit<BinaryConnectives<T, R>, 'and' | 'or'>> {}

export function makeConnectives<T, R extends T>(
	args: MakeConnectivesArgs<T, R>,
): Connectives<T, R> {
	const {not, and, or} = args;
	const xor = (p: T, q: T) => and(or(p, q), or(not(p), not(q)));
	const imply = (p: T, q: T) => or(not(p), q);
	const nand = (p: T, q: T) => not(and(p, q));
	const nor = (p: T, q: T) => not(or(p, q));
	const xnor = (p: T, q: T) => not(xor(p, q));
	const nimply = (p: T, q: T) => not(imply(p, q));

	return {
		not,
		and: toVariadic(and),
		or: toVariadic(or),
		xor: toVariadic(args.xor ?? xor),
		imply: toVariadic(args.imply ?? imply),
		nand: toVariadic(args.nand ?? nand),
		nor: toVariadic(args.nor ?? nor),
		xnor: toVariadic(args.xnor ?? xnor),
		nimply: toVariadic(args.nimply ?? nimply),
	};
}
