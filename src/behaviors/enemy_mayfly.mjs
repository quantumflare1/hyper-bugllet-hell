import Vec2 from "../math/vec2.mjs";
import Bullet from "../nodes/prefabs/bullet.mjs";

const X_VELOCITY = 140;

// 0
function spawn() {
	this.velocity.x = X_VELOCITY * ((this.position.x > 0) ? -1 : 1);
	return 1;
}

const Y_ACCEL = 5;
const MAX_Y_VELOCITY = 100;

// 1
function fall() {
	console.log(this.velocity)
	this.velocity.y += Y_ACCEL;

	if (this.velocity.y > MAX_Y_VELOCITY) {
		return 2;
	}
	return 1;
}

const BASE_BULLET_SPEED = 0;

// 2
function fire() {
	this.velocity.y = -MAX_Y_VELOCITY;

	new Bullet(this.parent, this.position.copy(), new Vec2(0, BASE_BULLET_SPEED), "gravity", 0x80ffb8);
	return 1;
}

export default [spawn, fall, fire];