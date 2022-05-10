import {makeConnectives} from './utils.js';

function not(p: number): number {
	/* eslint-disable-next-line no-bitwise */
	return ~p;
}

function and(p: number, q: number): number {
	/* eslint-disable-next-line no-bitwise */
	return p & q;
}

function or(p: number, q: number): number {
	/* eslint-disable-next-line no-bitwise */
	return p | q;
}

function xor(p: number, q: number): number {
	/* eslint-disable-next-line no-bitwise */
	return p ^ q;
}

export default makeConnectives({not, and, or, xor});
