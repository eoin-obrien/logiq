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

	if (pBytes.length === 0 || qBytes.length === 0) {
		throw new Error('Operands must have length > 0');
	}

	const length = Math.max(pBytes.length, qBytes.length);
	const result = new Uint8Array(length);
	for (let i = 0; i < result.length; i++) {
		const pByte = pBytes[i % pBytes.length]!;
		const qByte = qBytes[i % qBytes.length]!;
		result[i] = connective(pByte, qByte);
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
