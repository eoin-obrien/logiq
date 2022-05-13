import test from 'ava';
import {TypedArray} from 'type-fest';
import {typedArray} from '../src/index.js';
import {BinaryConnective} from '../src/utils.js';

const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);
view.setInt32(0, 0x01_01_01_01);
view.setInt32(4, 0xff_ff_00_00);

const truthTable = test.macro(
	(
		t,
		connective: BinaryConnective<TypedArray, Uint8Array>,
		table: Uint8Array,
	) => {
		const p = new Uint32Array(buffer, 4, 1); // Check offsets work correctly
		const q = Uint8Array.of(255, 0); // Mismatched lengths will be repeated
		t.deepEqual(connective(p, q), table);
		t.throws(() => connective(Uint8Array.of(1), Uint8Array.of()), {
			message: 'Operands must have length > 0',
		});
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
