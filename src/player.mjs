import { Ticker, Sprite, Application } from "pixi.js";
import { assets } from "./asset_manager.mjs";
import KeyInput from "./component/key_input.mjs";
import KeyConstants from "./constant_defs/key_constants.json" with { type: "json" };

export default class Player {
	position = { x:240, y:240 };
	velocity = { x:0, y:0 };
	collider;
	input = new KeyInput();
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

		if (this.input.poll("ArrowUp") & KeyConstants.pollResponse.KEY_HELD) {
			this.position.y -= 1;
		}
		if (this.input.poll("ArrowLeft") & KeyConstants.pollResponse.KEY_HELD) {
			this.position.x -= 1;
		}
		if (this.input.poll("ArrowDown") & KeyConstants.pollResponse.KEY_HELD) {
			this.position.y += 1;
		}
		if (this.input.poll("ArrowRight") & KeyConstants.pollResponse.KEY_HELD) {
			this.position.x += 1;
		}
	}
}