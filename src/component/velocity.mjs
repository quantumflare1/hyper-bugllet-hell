import { Ticker } from "pixi.js";
import Position from "./position.mjs";
import Component from "./component.mjs";

export default class Velocity extends Component {
	static id = "velocity";

	x; y; pos;

	/**
	 * @param {Position} pos 
	 * @param {Ticker} ticker 
	 */
	constructor(x = 0, y = 0, pos, ticker) {
		super();

		this.x = x;
		this.y = y;
		this.pos = pos;
		ticker?.add(this.tick.bind(this));
	}
	/**
	 * @param {Ticker} ticker 
	 */
	tick(ticker) {
		this.pos.x += this.x * ticker.deltaMS;
		this.pos.y += this.y * ticker.deltaMS;
	}
}