import test from 'ava';
import {logical} from '../src/index.js';

type Connective = (p: boolean, q: boolean) => boolean;
type TruthTable = [tt: boolean, tf: boolean, ft: boolean, ff: boolean];

const truthTable = test.macro(
	(t, connective: Connective, table: TruthTable) => {
		t.is(connective(true, true), table[0]);
		t.is(connective(true, false), table[1]);
		t.is(connective(false, true), table[2]);
		t.is(connective(false, false), table[3]);
	},
);

test('not', t => {
	t.is(logical.not(true), false);
	t.is(logical.not(false), true);
});
test('and', truthTable, logical.and, [true, false, false, false]);
test('or', truthTable, logical.or, [true, true, true, false]);
test('xor', truthTable, logical.xor, [false, true, true, false]);
test('imply', truthTable, logical.imply, [true, false, true, true]);
test('nand', truthTable, logical.nand, [false, true, true, true]);
test('nor', truthTable, logical.nor, [false, false, false, true]);
test('xnor', truthTable, logical.xnor, [true, false, false, true]);
test('nimply', truthTable, logical.nimply, [false, true, false, false]);
