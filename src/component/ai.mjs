import { Ticker } from "pixi.js";
import Component from "./component.mjs";

export default class AI extends Component {
	static id = "ai";
	state;
	behaviors;
	parent;
	memory = {};

	/**
	 * @param {Ticker} ticker 
	 */
	constructor(ticker, parent, defaultState = 0, ...behaviors) {
		super();
		ticker.add(this.tick.bind(this));
		this.parent = parent;
		this.state = defaultState;
		this.behaviors = behaviors;
	}
	tick(ticker) {
		const result = this.behaviors[this.state].tick(ticker, this.parent, this.memory);
		if (result !== -1) this.state = result;
	}
}