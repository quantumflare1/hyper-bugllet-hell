import { Ticker } from "pixi.js";

export default class Scene {
	display;
	ticker = new Ticker();
	nodes = new WeakSet();

	constructor(display) {
		this.display = display;
		this.ticker.autoStart = true;
	}
	addChild(node) {
		this.nodes.add(node);
		this.ticker.add(node.tick);
	}
	removeChild(node) {
		this.nodes.delete(node);
		this.ticker.remove(node.tick);
	}
}