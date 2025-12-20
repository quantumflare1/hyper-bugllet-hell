export default class Vec2 {
	x; y;

	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	add(vec) {
		this.x += vec.x;
		this.y += vec.y;
	}
	subtract(vec) {
		this.x -= vec.x;
		this.y -= vec.y;
	}
	multiply(n) {
		this.x *= n;
		this.y *= n;
	}
	divide(n) {
		this.x /= n;
		this.y /= n;
	}
	dot(vec) {
		return this.x * vec.x + this.y * vec.y;
	}
	lengthSquared() {
		return this.x ** 2 + this.y ** 2;
	}
	copy() {
		return new Vec2(this.x, this.y);
	}
	equals(vec) {
		return this.x === vec.x && this.y === vec.y;
	}
}