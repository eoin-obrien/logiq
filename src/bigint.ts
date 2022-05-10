export function not(p: number | bigint): bigint {
	/* eslint-disable-next-line no-bitwise */
	return ~BigInt(p);
}

export function and(p: number | bigint, q: number | bigint): bigint {
	/* eslint-disable-next-line no-bitwise */
	return BigInt(p) & BigInt(q);
}

export function or(p: number | bigint, q: number | bigint): bigint {
	/* eslint-disable-next-line no-bitwise */
	return BigInt(p) | BigInt(q);
}

export function xor(p: number | bigint, q: number | bigint): bigint {
	/* eslint-disable-next-line no-bitwise */
	return BigInt(p) ^ BigInt(q);
}

export function imply(p: number | bigint, q: number | bigint): bigint {
	return or(not(p), q);
}

export function nand(p: number | bigint, q: number | bigint): bigint {
	return not(and(p, q));
}

export function nor(p: number | bigint, q: number | bigint): bigint {
	return not(or(p, q));
}

export function xnor(p: number | bigint, q: number | bigint): bigint {
	return not(xor(p, q));
}

export function nimply(p: number | bigint, q: number | bigint): bigint {
	return not(imply(p, q));
}
