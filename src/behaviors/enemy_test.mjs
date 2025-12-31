import Vec2 from "../math/vec2.mjs";
import { smoothstep } from "../math/interpolation.mjs";
import Bullet from "../nodes/prefabs/bullet.mjs";

const MOVE_TIME = 1000;
const PATTERNS_FIRED = 3;

// 0
function moveIn() {
	if (!("startTime" in this.state.memories)) {
		const targetY = 60;
		this.state.memories.startTime = this.state.timePassed;
		this.state.memories.target = targetY;
		this.state.memories.start = this.position.y;

		this.state.memories.patternsFired = 0;
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

// 2
function moveOut() {
	if (!("startTime" in this.state.memories)) {
		const targetY = -60;
		this.state.memories.startTime = this.state.timePassed;
		this.state.memories.target = targetY;
		this.state.memories.start = this.position.y;
	}
	const timeProgress = (this.state.timePassed - this.state.memories.startTime) / MOVE_TIME;
	this.position.y = smoothstep(this.state.memories.start, this.state.memories.target, timeProgress); // who the fuck needs velocity anyway
	if (timeProgress >= 1) {
		delete this.state.memories.startTime;
		delete this.state.memories.target;
		delete this.state.memories.start;
		return 0; // theoretically this guy should despawn before then ?
	}
	return 2;
}

const INITIAL_WAIT = 1000;

// 3
function initialWait() {
	if (!("startTime" in this.state.memories)) {
		this.state.memories.startTime = this.state.timePassed;
	}

	if (this.state.timePassed - this.state.memories.startTime > INITIAL_WAIT) {
		delete this.state.memories.startTime;
		return 1;
	}
	return 3;
}

const BASE_SPREAD = Math.PI / 6;
const SPREAD_DECREASE_RATE = Math.PI / 9;
const INITIAL_COOLDOWN = 300;
const FIRE_COOLDOWN = 60;
const ATTACK_TIME = 1000;

// 1
function fire() {
	if (!("startTime" in this.state.memories)) {
		const target = this.parent.player.position.copy();
		this.state.memories.startTime = this.state.timePassed;
		this.state.memories.target = target;
		this.state.memories.lastFireTime = this.state.timePassed - INITIAL_COOLDOWN;
	}

	if (this.state.timePassed - this.state.memories.lastFireTime > FIRE_COOLDOWN) {
		this.state.memories.lastFireTime = this.state.timePassed;
		const spread = BASE_SPREAD - (this.state.timePassed - this.state.memories.startTime) / 1000 * SPREAD_DECREASE_RATE; // i need a better way to track time passing lol
		const toPlayer = this.state.memories.target.copy();
		toPlayer.subtract(this.position);
		const currentAngle = toPlayer.angle() + Math.cos(this.state.timePassed - this.state.memories.startTime) * spread;
		const currentSpeed = 60 + (this.state.timePassed - this.state.memories.startTime) / 10;

		new Bullet(this.parent, this.position.copy(), Vec2.fromGeometric(currentAngle, currentSpeed), "default", 0xff0000);
	}

	if (this.state.timePassed - this.state.memories.startTime > ATTACK_TIME) {
		delete this.state.memories.startTime;
		delete this.state.memories.target;
		delete this.state.memories.lastFireTime;

		this.state.memories.patternsFired++;
		if (this.state.memories.patternsFired === PATTERNS_FIRED) {
			return 2;
		}
		return 4;
	}
	return 1;
}

const WAIT_TIME = 2500;

// 4
function wait() {
	if (!("startTime" in this.state.memories)) {
		this.state.memories.startTime = this.state.timePassed;
	}

	if (this.state.timePassed - this.state.memories.startTime > WAIT_TIME) {
		delete this.state.memories.startTime;
		return 1;
	}
	return 4;
}

export default [moveIn, fire, moveOut, initialWait, wait];