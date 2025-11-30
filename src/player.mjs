import { Ticker, Application } from "pixi.js";
import { assets } from "./asset_manager.mjs";
import Position from "./component/position.mjs";
import Velocity from "./component/velocity.mjs";
import EntitySprite from "./component/sprite.mjs";
import PlayerControl from "./component/player.mjs";

export default class Player {
	position = new Position(240, 240);
	velocity = new Velocity(0, 0, this.position);
	collider;
	control = new PlayerControl(this);
	sprite;
	/**
	 * @param {Application} app 
	 */
	constructor(app) {
		this.sprite = new EntitySprite(assets.player, this.position, 0.5, app.stage);
		app.ticker.add(this.tick.bind(this));
	}
	/**
	 * @param {Ticker} ticker 
	 */
	tick(ticker) {
		this.control.tick(ticker);
		this.velocity.tick(ticker);
		this.sprite.tick(ticker);
	}
}