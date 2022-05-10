import {makeConnectives} from './utils.js';

function not(p: any): boolean {
	return !p;
}

function and(p: any, q: any): boolean {
	return Boolean(p) && Boolean(q);
}

function or(p: any, q: any): boolean {
	return Boolean(p) || Boolean(q);
}

export default makeConnectives({not, and, or});
