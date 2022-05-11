import {TypedArray} from 'type-fest';
import {BinaryConnective, makeConnectives} from './utils.js';
import {bitwise} from './index.js';

function applyBitwise(
	connective: BinaryConnective<number, number>,
	p: TypedArray,
	q: TypedArray,
) {
	const pBytes = new Uint8Array(p);
	const qBytes = new Uint8Array(q);

	if (pBytes.length !== qBytes.length) {
		throw new Error('Expected operands to be of equal byte length');
	}

	const result = new Uint8Array(pBytes.length);
	for (const [i, pByte] of pBytes.entries()) {
		result[i] = connective(pByte, qBytes[i]!);
	}

	return result;
}

function not(p: TypedArray): Uint8Array {
	return new Uint8Array(p).map((value) => bitwise.not(value));
}

function and(p: TypedArray, q: TypedArray): Uint8Array {
	return applyBitwise(bitwise.and, p, q);
}

function or(p: TypedArray, q: TypedArray): Uint8Array {
	return applyBitwise(bitwise.or, p, q);
}

function xor(p: TypedArray, q: TypedArray): Uint8Array {
	return applyBitwise(bitwise.xor, p, q);
}

export default makeConnectives({not, and, or, xor});
