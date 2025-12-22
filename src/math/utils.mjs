export function randomIntBetween(a, b) {
	return Math.trunc(randomNumBetween(a, b));
}

export function randomNumBetween(a, b) {
	return Math.random() * (b - a) + a;
}

export function clamp(n, min, max) {
	if (n < min) return min;
	if (n > max) return max;
	return n;
}