import {TypedArray} from 'type-fest';
import {BinaryConnective, makeConnectives, UnaryConnective} from './utils.js';
import {bitwise} from './index.js';

const applyBitwise = (
	connective: BinaryConnective<number, number>,
	p: TypedArray,
	q: TypedArray,
) => {
	const pBytes = new Uint8Array(p);
	const qBytes = new Uint8Array(q);
	const byteLength = Math.max(p.byteLength, q.byteLength);
	const result = new Uint8Array(byteLength);
	for (let i = 0; i < byteLength; i++) {
		result[i] = connective(pBytes[i % byteLength]!, qBytes[i % byteLength]!);
	}

	return result;
};

const not: UnaryConnective<TypedArray, Uint8Array> = (p) => {
	const pBytes = new Uint8Array(p);
	return pBytes.map((value) => bitwise.not(value));
};

const and: BinaryConnective<TypedArray, Uint8Array> = (p, q) =>
	applyBitwise(bitwise.and, p, q);

const or: BinaryConnective<TypedArray, Uint8Array> = (p, q) =>
	applyBitwise(bitwise.or, p, q);

const xor: BinaryConnective<TypedArray, Uint8Array> = (p, q) =>
	applyBitwise(bitwise.xor, p, q);

export default makeConnectives({not, and, or, xor});
