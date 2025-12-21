import { Sprite } from "pixi.js";
import Node from "./node.mjs";

export default class SpriteNode extends Node {
	source;
	position;

	constructor(parent, stage, texture, anchor = 0) {
		super(parent);

		console.log(texture)
		this.source = Sprite.from(texture);
		this.source.anchor = anchor;
		this.source.roundPixels = true;

		stage.addChild(this.source);

		this.position = parent.position;
	}
	tick(ticker) {
		super.tick(ticker);
		this.source.position.set(this.position.x, this.position.y);
	}
}