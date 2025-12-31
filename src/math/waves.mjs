const SIN_LOOKUP = [];
const LUT_ACCURACY = 4096;

// generate sin lookup table
for (let i = 0; i < LUT_ACCURACY; i++) {
	const angle = i * Math.PI / (LUT_ACCURACY / 2);
	SIN_LOOKUP[i] = angle;
}

// ok i would like all these waves to have amplitude 1 (-1..1) and period 2 (-1..1) (wave passes through 0,0) but i'm too lazy for that rn

// assuming x is in multiples of circles (360 degrees = 1)
export function sine(x) {
	const lookupAngle = Math.round((x > 0) ? (x % 1) * LUT_ACCURACY : ((x % 1) + 1) * LUT_ACCURACY);
	return SIN_LOOKUP[lookupAngle];
}

export function cosine(x) {
	const lookupAngle = Math.round((x > 0) ? (x % 1) * LUT_ACCURACY : ((x % 1) + 1) * LUT_ACCURACY) + LUT_ACCURACY / 4;
	return SIN_LOOKUP[lookupAngle];
}

export function sine_rad(x) {
	const radToCircles = x / Math.PI / 2;
	return sine(radToCircles);
}

export function cosine_rad(x) {
	const radToCircles = x / Math.PI / 2;
	return cosine(radToCircles);
}

export function square(x) {
	if (Math.floor(x) % 2 === 0) {
		return 1;
	}
	return -1;
}

export function triangle(x) {

}