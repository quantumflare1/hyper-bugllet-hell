import Vec2 from "../math/vec2.mjs";

function randomIntBetween(a, b) {
	return Math.trunc(Math.random() * (b - a) + a);
}

export function moveToRandomPosition(ticker, stateMachine) {
	if ("timePassed" in stateMachine.memories) {
		stateMachine.memories.timePassed += ticker.deltaMS;
		if (stateMachine.memories.timePassed >= 1000) {
			delete stateMachine.memories.timePassed;
			stateMachine.parent.velocity.zero();
			return 1;
		}
		return 0;
	}
	const targetPos = new Vec2(randomIntBetween(0, 480), randomIntBetween(0, 480));
	stateMachine.memories.timePassed = 0;
	targetPos.subtract(stateMachine.parent.position);
	stateMachine.parent.velocity = targetPos;
	return 0;
}

export function wait(ticker, stateMachine) {
	if ("timePassed" in stateMachine.memories) {
		stateMachine.memories.timePassed += ticker.deltaMS;
		if (stateMachine.memories.timePassed >= 500) {
			delete stateMachine.memories.timePassed;
			return 0;
		}
		return 1;
	}
	stateMachine.memories.timePassed = 0;
	return 1;
}