import { Ticker } from "pixi.js";
import Behavior from "../constant_defs/behavior_constants.json" with {type: "json"};

const defaults = {
	time: 0,
	//threshold: 400,
	//rangeX: [0, 480],
	//rangeY: [0, 480],
};

const idle = {
	time: 0,
	threshold: 400,
	rangeX: [0, 480],
	rangeY: [0, 480],
	reset() {
		for (const i in defaults) {
			idle[i] = defaults[i];
		}
	},
	/**
	 * @param {Ticker} ticker 
	 * @param {Entity} parent 
	 */
	tick(ticker, parent, memory) {
		this.time += ticker.deltaMS;
		
		if (this.time > this.threshold) {
			memory.targetX = Math.floor(Math.random() * this.rangeX[1]) + this.rangeX[0];
			memory.targetY = Math.floor(Math.random() * this.rangeY[1]) + this.rangeY[0];

			this.reset();
			return Behavior.MOVE;
		}
		return -1;
	}
};
export default idle;