export default class Vec2 {
	x; y;

	static fromGeometric(angle, length) {
		const x = Math.cos(angle) * length;
		const y = Math.sin(angle) * length;
		return new Vec2(x, y);
	}
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
	zero() {
		this.x = 0;
		this.y = 0;
	}
	normalized() {
		const normal = this.copy();
		normal.divide(Math.sqrt(this.lengthSquared()));
		return normal;
	}
	angle() {
		const unitVector = this.normalized();
		if (unitVector.x > 0) {
			return Math.asin(unitVector.y);
		}
		else {
			return Math.PI - Math.asin(unitVector.y);
		}
	}
}