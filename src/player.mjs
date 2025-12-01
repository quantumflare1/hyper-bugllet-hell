import { Ticker, Application } from "pixi.js";
import { assets } from "./asset_manager.mjs";
import Position from "./component/position.mjs";
import Velocity from "./component/velocity.mjs";
import EntitySprite from "./component/sprite.mjs";
import PlayerControl from "./component/player.mjs";

// TODO: make entity base class (?)
export default class Player {
	position;
	velocity;
	collider;
	control;
	sprite;
	/**
	 * @param {Application} app 
	 */
	constructor(app) {
		this.position = new Position(240, 240);
		this.velocity = new Velocity(0, 0, this.position, app.ticker);
		this.control = new PlayerControl(this, app.ticker);
		this.sprite = new EntitySprite(assets.player, this.position, 0.5, app.stage, app.ticker);
	}
}