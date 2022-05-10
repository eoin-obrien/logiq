import test from 'ava';
import {bitwise} from '../src/index.js';

type Connective = (p: number, q: number) => number;

const truthTable = test.macro(
	(t, connective: Connective, table: number) => {
		t.is(connective(0b1100, 0b1010), table);
	},
);

test('not', t => {
	t.is(bitwise.not(0b10), -0b11);
});
test('and', truthTable, bitwise.and, 0b1000);
test('or', truthTable, bitwise.or, 0b1110);
test('xor', truthTable, bitwise.xor, 0b0110);
test('imply', truthTable, bitwise.imply, -0b0101);
test('nand', truthTable, bitwise.nand, -0b1001);
test('nor', truthTable, bitwise.nor, -0b1111);
test('xnor', truthTable, bitwise.xnor, -0b0111);
test('nimply', truthTable, bitwise.nimply, 0b0100);
