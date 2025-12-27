import Node from "./node.mjs";

export default class StateMachine extends Node {
	states = [];
	memories = {};
	timePassed = 0;
	currentState = 0;

	constructor(parent, ...states) {
		super(parent);
		parent.state = this;
		for (const state of states) {
			this.states.push(state.bind(parent));
		}
	}
	tick(ticker) {
		super.tick(ticker);
		this.timePassed += ticker.deltaMS;
		this.currentState = this.states[this.currentState]();
	}
}