import { Ticker } from "pixi.js";
import Position from "./position.mjs";

export default class Velocity {
	x; y; pos;

	/**
	 * @param {Position} pos 
	 */
	constructor(x = 0, y = 0, pos) {
		this.x = x;
		this.y = y;
		this.pos = pos;
	}
	/**
	 * @param {Ticker} ticker 
	 */
	tick(ticker) {
		this.pos.x += this.x * ticker.deltaMS;
		this.pos.y += this.y * ticker.deltaMS;
	}
}