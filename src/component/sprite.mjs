import { Container, Sprite, Ticker } from "pixi.js";
import Position from "./position.mjs";

export default class EntitySprite {
	texture;
	pos;

	/**
	 * @param {Position} pos
	 * @param {idk} texture  
	 * @param {Container} stage 
	 * @param {Ticker} ticker
	 */
	constructor(texture, pos, anchor = 0, stage, ticker) {
		this.texture = Sprite.from(texture);
		this.texture.anchor = anchor;
		this.texture.roundPixels = true;
		stage.addChild(this.texture);
		this.pos = pos;
		ticker.add(this.tick.bind(this));
	}
	tick() {
		this.texture.position.set(this.pos.x, this.pos.y);
	}
}