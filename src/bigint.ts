import {makeConnectives} from './utils.js';

function not(p: number | bigint): bigint {
	/* eslint-disable-next-line no-bitwise */
	return ~BigInt(p);
}

function and(p: number | bigint, q: number | bigint): bigint {
	/* eslint-disable-next-line no-bitwise */
	return BigInt(p) & BigInt(q);
}

function or(p: number | bigint, q: number | bigint): bigint {
	/* eslint-disable-next-line no-bitwise */
	return BigInt(p) | BigInt(q);
}

function xor(p: number | bigint, q: number | bigint): bigint {
	/* eslint-disable-next-line no-bitwise */
	return BigInt(p) ^ BigInt(q);
}

export default makeConnectives({not, and, or, xor});
