import Vec2 from "../math/vec2.mjs";
import { randomIntBetween } from "../math/utils.mjs";

function moveToRandomPosition() {
	if ("startTime" in this.memories) {
		if (this.timePassed - this.memories.startTime >= 1000) {
			delete this.memories.startTime;
			this.parent.velocity.zero();
			return 1;
		}
		return 0;
	}
	const targetPos = new Vec2(randomIntBetween(0, 480), randomIntBetween(0, 480));
	this.memories.startTime = this.timePassed;
	targetPos.subtract(this.parent.position);
	this.parent.velocity = targetPos;
	return 0;
}

function wait() {
	if ("startTime" in this.memories) {
		if (this.timePassed - this.memories.startTime >= 500) {
			delete this.memories.startTime;
			return 0;
		}
		return 1;
	}
	this.memories.startTime = this.timePassed;
	return 1;
}

export default [moveToRandomPosition, wait];