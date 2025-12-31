function clamp(n) {
	if (n < 0) return 0;
	if (n > 1) return 1;
	return n;
}

export function lerp(a, b, n) {
	return a + n * (b-a);
}

export function smoothstep(a, b, n) {
	const x = clamp(n);
	return lerp(a, b, 3 * x ** 2 - 2 * x ** 3);
}

export function easeIn(a, b, n) {
	const x = clamp(n);
	return lerp(a, b, x ** 2);
}

export function easeOut(a, b, n) {
	const x = clamp(n);
	return lerp(a, b, 2 * x - x ** 2);
}