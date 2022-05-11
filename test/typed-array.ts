import test from 'ava';
import {TypedArray} from 'type-fest';
import {typedArray} from '../src/index.js';
import {BinaryConnective} from '../src/utils.js';

const truthTable = test.macro(
	(
		t,
		connective: BinaryConnective<TypedArray, Uint8Array>,
		table: Uint8Array,
	) => {
		const p = Uint8Array.of(255, 255, 0, 0);
		const q = Uint8Array.of(255, 0, 255, 0);
		t.deepEqual(connective(p, q), table);
		t.deepEqual(p, Uint8Array.of(255, 255, 0, 0), 'operands must be unchanged');
		t.deepEqual(q, Uint8Array.of(255, 0, 255, 0), 'operands must be unchanged');
	},
);

test('not', (t) => {
	const p = Uint8Array.of(255, 0);
	t.deepEqual(typedArray.not(p), Uint8Array.of(0, 255));
	t.deepEqual(p, Uint8Array.of(255, 0), 'operands must be unchanged');
});
test('and', truthTable, typedArray.and, Uint8Array.of(255, 0, 0, 0));
test('or', truthTable, typedArray.or, Uint8Array.of(255, 255, 255, 0));
test('xor', truthTable, typedArray.xor, Uint8Array.of(0, 255, 255, 0));
test('imply', truthTable, typedArray.imply, Uint8Array.of(255, 0, 255, 255));
test('nand', truthTable, typedArray.nand, Uint8Array.of(0, 255, 255, 255));
test('nor', truthTable, typedArray.nor, Uint8Array.of(0, 0, 0, 255));
test('xnor', truthTable, typedArray.xnor, Uint8Array.of(255, 0, 0, 255));
test('nimply', truthTable, typedArray.nimply, Uint8Array.of(0, 255, 0, 0));
test('variadic', (t) => {
	const p = Uint8Array.of(1);
	t.deepEqual(typedArray.and(p, p, p), p);
});
