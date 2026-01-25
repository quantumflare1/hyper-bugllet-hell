import Vec2 from "../math/vec2.mjs";
import { smoothstep } from "../math/interpolation.mjs";
import Bullet from "../nodes/prefabs/bullet.mjs";

const MOVE_TIME = 1000;
const PATTERNS_FIRED = 3;

// 0
function moveIn() {
	if (!("target" in this.state.memories)) {
		const targetY = 60;
		this.timer.mark();
		this.state.memories.target = targetY;
		this.state.memories.start = this.position.y;

		this.state.memories.patternsFired = 0;
	}
	const timeProgress = this.timer.timePassed / MOVE_TIME;
	this.position.y = smoothstep(this.state.memories.start, this.state.memories.target, timeProgress);
	if (timeProgress >= 1) {
		delete this.state.memories.target;
		delete this.state.memories.start;
		return 1;
	}
	return 0;
}

// 2
function moveOut() {
	if (!("target" in this.state.memories)) {
		const targetY = -60;
		this.timer.mark();
		this.state.memories.target = targetY;
		this.state.memories.start = this.position.y;
	}
	const timeProgress = this.timer.timePassed / MOVE_TIME;
	this.position.y = smoothstep(this.state.memories.start, this.state.memories.target, timeProgress); // who the fuck needs velocity anyway
	if (timeProgress >= 1) {
		delete this.state.memories.target;
		delete this.state.memories.start;
		return 0; // theoretically this guy should despawn before then ?
	}
	return 2;
}

const INITIAL_WAIT = 1000;

// 3
function initialWait() {
	if (!("waiting" in this.state.memories)) {
		this.timer.mark();
		this.state.memories.waiting = true;
	}

	if (this.timer.timePassed > INITIAL_WAIT) {
		delete this.state.memories.waiting;
		return 1;
	}
	return 3;
}

const BASE_SPREAD = Math.PI / 6;
const SPREAD_DECREASE_RATE = Math.PI / 9;
const INITIAL_COOLDOWN = 300;
const FIRE_COOLDOWN = 60;
const ATTACK_TIME = 1000;
const BASE_BULLET_SPEED = 60;
const BULLET_SPEED_TIME_SCALING = 10;

// 1
function fire() {
	if (!("target" in this.state.memories)) {
		const target = this.parent.player.position.copy();
		this.timer.mark();// rewrite everything to use this
		//this.state.memories.startTime = this.state.timePassed;
		this.state.memories.target = target;
		this.state.memories.lastFireTime = this.timer.timePassed + INITIAL_COOLDOWN;
	}

	if (this.timer.timePassed - this.state.memories.lastFireTime > FIRE_COOLDOWN) {
		this.state.memories.lastFireTime = this.timer.timePassed;
		const spread = BASE_SPREAD - this.timer.timePassed / 1000 * SPREAD_DECREASE_RATE; // i need a better way to track time passing lol
		const toPlayer = this.state.memories.target.copy().subtract(this.position);

		const currentAngle = toPlayer.angle() + Math.cos(this.timer.timePassed) * spread;
		const currentSpeed = BASE_BULLET_SPEED + this.timer.timePassed / BULLET_SPEED_TIME_SCALING;

		new Bullet(this.parent, this.position.copy(), Vec2.fromGeometric(currentAngle, currentSpeed), "default", 0xff0000);
	}

	if (this.timer.timePassed > ATTACK_TIME) {
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
	if (!("waiting" in this.state.memories)) {
		this.timer.mark();
		this.state.memories.waiting = true;
	}

	if (this.timer.timePassed > WAIT_TIME) {
		delete this.state.memories.waiting;
		return 1;
	}
	return 4;
}

export default [moveIn, fire, moveOut, initialWait, wait];