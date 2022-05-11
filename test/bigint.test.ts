import test from 'ava';
import {bigint} from '../src/index.js';

type Connective = (p: bigint, q: bigint) => bigint;

const truthTable = test.macro((t, connective: Connective, table: bigint) => {
	t.is(connective(0b1100n, 0b1010n), table);
});

test('not', (t) => {
	t.is(bigint.not(0b10), -0b11n);
});
test('and', truthTable, bigint.and, 0b1000n);
test('or', truthTable, bigint.or, 0b1110n);
test('xor', truthTable, bigint.xor, 0b0110n);
test('imply', truthTable, bigint.imply, -0b0101n);
test('nand', truthTable, bigint.nand, -0b1001n);
test('nor', truthTable, bigint.nor, -0b1111n);
test('xnor', truthTable, bigint.xnor, -0b0111n);
test('nimply', truthTable, bigint.nimply, 0b0100n);
test('variadic', (t) => {
	t.is(bigint.and(1, 1, 1), 1n);
});
