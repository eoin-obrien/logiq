import {makeConnectives} from './utils.js';

type BigIntValue = Parameters<BigIntConstructor>[0];

function not(p: BigIntValue): bigint {
	/* eslint-disable-next-line no-bitwise */
	return ~BigInt(p);
}

function and(p: BigIntValue, q: BigIntValue): bigint {
	/* eslint-disable-next-line no-bitwise */
	return BigInt(p) & BigInt(q);
}

function or(p: BigIntValue, q: BigIntValue): bigint {
	/* eslint-disable-next-line no-bitwise */
	return BigInt(p) | BigInt(q);
}

function xor(p: BigIntValue, q: BigIntValue): bigint {
	/* eslint-disable-next-line no-bitwise */
	return BigInt(p) ^ BigInt(q);
}

export default makeConnectives({not, and, or, xor});
