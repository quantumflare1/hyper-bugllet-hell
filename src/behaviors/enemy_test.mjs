import Vec2 from "../math/vec2.mjs";
import { smoothstep } from "../math/interpolation.mjs";
import GlobalConstants from "../constant_defs/global_constants.json";
import Bullet from "../nodes/prefabs/bullet.mjs";

const MOVE_TIME = 1000;
const WAIT_TIME = 500;
const PATTERNS_FIRED = 6;

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

function moveIn() {
	if (!("startTime" in this.state.memories)) {
		const targetY = 60;
		this.state.memories.startTime = this.state.timePassed;
		this.state.memories.target = targetY;
		this.state.memories.start = this.position.y;
	}
	const timeProgress = (this.state.timePassed - this.state.memories.startTime) / MOVE_TIME;
	this.position.y = smoothstep(this.state.memories.start, this.state.memories.target, timeProgress);
	if (timeProgress >= 1) {
		delete this.state.memories.startTime;
		delete this.state.memories.target;
		delete this.state.memories.start;
		return 1;
	}
	return 0;
}

function moveOut() {
	if (!("startTime" in this.state.memories)) {
		const targetY = -60;
		this.state.memories.startTime = this.state.timePassed;
		this.state.memories.target = targetY;
		this.state.memories.start = this.position.y;
	}
	const timeProgress = (this.state.timePassed - this.state.memories.startTime) / MOVE_TIME;
	this.position.y = smoothstep(this.state.memories.start, this.state.memories.target, timeProgress);
	if (timeProgress >= 1) {
		delete this.state.memories.startTime;
		delete this.state.memories.target;
		delete this.state.memories.start;
		return 0; // theoretically this guy should despawn before then ?
	}
	return 2;
}

function wait() {
	if ("startTime" in this.state.memories) {
		if (this.state.timePassed - this.state.memories.startTime >= WAIT_TIME) {
			this.state.memories.startTime = this.state.timePassed;
			new Bullet(this.parent, this.position.copy(), "default", 0xff0000);
			this.state.memories.firedPatterns++;

			if (this.state.memories.firedPatterns === PATTERNS_FIRED) {
				delete this.state.memories.startTime;
				delete this.state.memories.firedPatterns;
				return 2;
			}
		}
		return 1;
	}
	this.state.memories.startTime = this.state.timePassed;
	this.state.memories.firedPatterns = 0;
	return 1;
}

export default [moveIn, wait, moveOut];