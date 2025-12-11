import { Ticker } from "pixi.js";
import Component from "./component.mjs";

/**
 * @callback cb
 */

export default class Timer extends Component {
	static id = "timer";
	timeRemaining;
	callback;
	ticker;

	/**
	 * @param {Ticker} ticker 
	 * @param {cb} callback 
	 */
	constructor(ticker, initialTime, callback) {
		super();
		this.timeRemaining = initialTime;
		this.callback = callback;
		this.ticker = ticker;
		ticker.add(this.tick);
	}
	addTime(ms) {
		this.timeRemaining += ms;
	}
	setTime(ms) {
		this.timeRemaining = ms;
	}
	reset(ms) {
		if (this.timeRemaining > 0) return;
		this.ticker.add(this.tick);
		this.setTime(ms);
	}
	/**
	 * @param {Ticker} ticker
	 */
	tick(ticker) {
		this.timeRemaining -= ticker.deltaMS;

		if (this.timeRemaining <= 0) {
			ticker.addOnce(this.callback);
			ticker.remove(this.tick);
		}
	}
}