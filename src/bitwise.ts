export function not(p: number): number {
	/* eslint-disable-next-line no-bitwise */
	return ~p;
}

export function and(p: number, q: number): number {
	/* eslint-disable-next-line no-bitwise */
	return p & q;
}

export function or(p: number, q: number): number {
	/* eslint-disable-next-line no-bitwise */
	return p | q;
}

export function xor(p: number, q: number): number {
	/* eslint-disable-next-line no-bitwise */
	return p ^ q;
}

export function imply(p: number, q: number): number {
	return or(not(p), q);
}

export function nand(p: number, q: number): number {
	return not(and(p, q));
}

export function nor(p: number, q: number): number {
	return not(or(p, q));
}

export function xnor(p: number, q: number): number {
	return not(xor(p, q));
}

export function nimply(p: number, q: number): number {
	return not(imply(p, q));
}
