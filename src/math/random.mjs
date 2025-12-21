export function randomIntBetween(a, b) {
	return Math.floor(randomNumBetween(a, b));
}

export function randomNumBetween(a, b) {
	return Math.random() * (b - a) + a;
}