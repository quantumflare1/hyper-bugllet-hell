import { Assets, Ticker, Sprite, Application } from "pixi.js";
import { assets } from "./asset_manager.mjs";

export default class Player {
	position = { x:240, y:240 };
	velocity = { x:0, y:0 };
	collider;
	sprite;
	/**
	 * @param {Application} app 
	 */
	constructor(app) {
		this.sprite = Sprite.from(assets.player);
		this.sprite.anchor = 0.5;
		app.stage.addChild(this.sprite);
		app.ticker.add(this.tick.bind(this));
		this.sprite.roundPixels = true;
	}
	/**
	 * @param {Ticker} ticker 
	 */
	tick(ticker) {
		this.sprite.position.set(this.position.x, this.position.y);
	}
}