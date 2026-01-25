import Node from "./node.mjs";

export default class TimerNode extends Node {
	timePassed;
	age;

	constructor(parent) {
		super(parent);
		parent.timer = this;
	}
	mark(delay = 0) {
		this.timePassed = delay;
	}
	tick(ticker) {
		super.tick(ticker);

		this.timePassed += ticker.deltaMS;
		this.age += ticker.deltaMS;
	}
}