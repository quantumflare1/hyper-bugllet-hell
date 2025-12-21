import Node from "./node.mjs";

export default class StateMachine extends Node {
	states = [];
	memories = {};
	currentState = 0;

	constructor(parent, ...states) {
		super(parent);
		this.states.push(...states);
	}
	tick(ticker) {
		super.tick(ticker);
		this.currentState = this.states[this.currentState](ticker, this);
	}
}