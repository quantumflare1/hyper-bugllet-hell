import { NineSliceSprite } from "pixi.js";
import Node from "./node.mjs";

export default class NineSliceSpriteNode extends Node {
	source;
	position;

	constructor(parent, stage, texture, cornerSize, width, height, anchor = 0, tint = null) {
		super(parent);
		parent.sprite = this;

		this.source = new NineSliceSprite({
			texture: texture,
			leftWidth: cornerSize,
			rightWidth: cornerSize,
			topHeight: cornerSize,
			bottomHeight: cornerSize,
			width: width,
			height: height
		});
		this.source.anchor = anchor;
		this.source.roundPixels = true;
		this.source.tint = tint;

		stage.addChild(this.source);

		this.position = parent.position;
	}
	destroy() {
		this.source.destroy();
	}
	tick(ticker) {
		super.tick(ticker);
		this.source.position.set(this.position.x, this.position.y);
	}
}