import { Ticker } from "pixi.js";
import CollisionManager from "./collision_manager.mjs";
import Vec2 from "../math/vec2.mjs";
import GlobalConstants from "../constant_defs/global_constants.json";

export default class Scene {
	display;
	ticker = new Ticker();
	nodes = new Set();
	collisionManager = new CollisionManager(new Vec2(GlobalConstants.FIELD_WIDTH, GlobalConstants.FIELD_HEIGHT));

	constructor(display) {
		this.display = display;
		this.ticker.maxFPS = 60;
		this.ticker.autoStart = true;
		this.ticker.add(this.tick.bind(this));
	}
	addChild(node) {
		this.nodes.add(node);
	}
	removeChild(node) {
		node.children.clear();
		this.nodes.delete(node);
	}
	tick(ticker) {
		for (const i of this.nodes) {
			i.tick(ticker);
		}
	}
}