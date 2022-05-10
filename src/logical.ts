export function not(p: any): boolean {
	return !p;
}

export function and(p: any, q: any): boolean {
	return Boolean(p) && Boolean(q);
}

export function or(p: any, q: any): boolean {
	return Boolean(p) || Boolean(q);
}

export function xor(p: any, q: any): boolean {
	return and(or(not(p), not(q)), or(p, q));
}

export function imply(p: any, q: any): boolean {
	return or(not(p), q);
}

export function nand(p: any, q: any): boolean {
	return not(and(p, q));
}

export function nor(p: any, q: any): boolean {
	return not(or(p, q));
}

export function xnor(p: any, q: any): boolean {
	return not(xor(p, q));
}

export function nimply(p: any, q: any): boolean {
	return not(imply(p, q));
}
