import { Ticker } from "pixi.js";

export default class Scene {
	display;
	ticker = new Ticker();
	nodes = new Set();

	constructor(display) {
		this.display = display;
		this.ticker.autoStart = true;
		this.ticker.add(this.tick.bind(this));
	}
	addChild(node) {
		this.nodes.add(node);
	}
	removeChild(node) {
		this.nodes.delete(node);
	}
	tick(ticker) {
		for (const i of this.nodes) {
			i.tick(ticker);
		}
	}
}