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
	const byteLength = Math.max(p.byteLength, q.byteLength);
	const result = new Uint8Array(byteLength);
	for (let i = 0; i < byteLength; i++) {
		result[i] = connective(pBytes[i % byteLength]!, qBytes[i % byteLength]!);
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
