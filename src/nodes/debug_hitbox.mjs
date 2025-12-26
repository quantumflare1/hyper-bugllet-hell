import { Graphics } from "pixi.js";
import Node from "./node.mjs";

export default class HitboxDebugNode extends Node {
	source;
	position;

	constructor(parent, stage) {
		super(parent);
		parent.sprite = this;

		const x = parent.position.x - parent.range.x - parent.radius;
		const y = parent.position.y - parent.range.y - parent.radius;
		const w = parent.range.x * 2 + parent.radius * 2;
		const h = parent.range.y * 2 + parent.radius * 2;
		this.source = new Graphics().roundRect(x, y, w, h, parent.radius).fill(0xff0000);

		stage.addChild(this.source);

		this.position = parent.position;
	}
	destroy() {
		this.source.destroy();
	}
	tick(ticker) {
		super.tick(ticker);
		//this.source.clear();
		// from what i've seen i have to make a separate canvas, draw the primitive to that, then use that as a sprite source???
		/* from pixijs's github issue tracker:
		var baseTexture = new PIXI.BaseTexture(yourCanvas);
		var texture = new PIXI.Texture(baseTexture);
		*/
		const x = this.position.x - this.parent.range.x - this.parent.radius;
		const y = this.position.y - this.parent.range.y - this.parent.radius;
		const w = this.parent.range.x * 2 + this.parent.radius * 2;
		const h = this.parent.range.y * 2 + this.parent.radius * 2;
		this.source.position.set(x, y);
	}
}