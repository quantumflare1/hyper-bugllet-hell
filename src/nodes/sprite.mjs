import { Sprite } from "pixi.js";
import Node from "./node.mjs";
import { assets } from "../core/asset_manager.mjs";

export default class SpriteNode extends Node {
	source;
	position;

	constructor(parent, stage, texture, position, anchor = 0) {
		super(parent);

		this.source = Sprite.from(assets[texture]);
		this.source.anchor = anchor;
		this.source.roundPixels = true;

		stage.addChild(this.source);

		this.position = position;
	}
	tick(ticker) {
		super.tick(ticker);
		this.source.position.set(this.position.x, this.position.y);
	}
}