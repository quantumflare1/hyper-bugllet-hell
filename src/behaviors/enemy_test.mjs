import Vec2 from "../math/vec2.mjs";
import { randomIntBetween } from "../math/utils.mjs";
import GlobalConstants from "../constant_defs/global_constants.json";
import Bullet from "../nodes/prefabs/bullet.mjs";

const MOVE_TIME = 1000;
const WAIT_TIME = 500;

function moveToRandomPosition() {
	if ("startTime" in this.state.memories) {
		if (this.state.timePassed - this.state.memories.startTime >= MOVE_TIME) {
			delete this.state.memories.startTime;
			this.velocity.zero();
			return 1;
		}
		return 0;
	}
	const targetPos = new Vec2(randomIntBetween(0, GlobalConstants.FIELD_WIDTH), randomIntBetween(0, GlobalConstants.FIELD_HEIGHT/2));
	this.state.memories.startTime = this.state.timePassed;
	targetPos.subtract(this.position);
	this.velocity = targetPos;
	return 0;
}

function wait() {
	if ("startTime" in this.state.memories) {
		if (this.state.timePassed - this.state.memories.startTime >= WAIT_TIME) {
			delete this.state.memories.startTime;
			new Bullet(this.parent, this.position.copy(), "test");
			return 0;
		}
		return 1;
	}
	this.state.memories.startTime = this.state.timePassed;
	return 1;
}

export default [moveToRandomPosition, wait];