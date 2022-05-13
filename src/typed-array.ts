import {TypedArray} from 'type-fest';
import {BinaryConnective, makeConnectives} from './utils.js';
import {bitwise} from './index.js';

/**
 * Converts any `TypedArray` to a `Uint8Array`, preserving offset and length.
 */
function toBytes(p: TypedArray): Uint8Array {
	return new Uint8Array(p.buffer, p.byteOffset, p.byteLength);
}

/**
 * Applies a binary connective to two `TypedArrays` in bitwise fashion.
 */
function applyBitwise(
	connective: BinaryConnective<number, number>,
	p: TypedArray,
	q: TypedArray,
) {
	// Work with bytes to avoid issues with non-integers and endianness
	const pBytes = toBytes(p);
	const qBytes = toBytes(q);

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
	return toBytes(p).map((value) => bitwise.not(value));
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
