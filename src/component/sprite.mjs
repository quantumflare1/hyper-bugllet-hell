import { Container, Sprite, Ticker } from "pixi.js";
import Position from "./position.mjs";
import Component from "./component.mjs";

export default class EntitySprite extends Component {
	static id = "sprite";
	texture;
	pos;

	/**
	 * @param {Position} pos
	 * @param {idk} texture  
	 * @param {Container} stage 
	 * @param {Ticker} ticker
	 */
	constructor(texture, pos, anchor = 0, stage, ticker) {
		super();
		
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