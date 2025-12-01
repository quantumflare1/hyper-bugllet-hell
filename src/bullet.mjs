import { Application } from "pixi.js";
import Position from "./component/position.mjs";
import Velocity from "./component/velocity.mjs";
import EntitySprite from "./component/sprite.mjs";
import { assets } from "./asset_manager.mjs";

export default class Bullet {
	position;
	velocity;
	collider;
	sprite;
	
	/**
	 * @param {Application} app 
	 */
	constructor(app, posX, posY, texture) {
		this.position = new Position(posX, posY);
		this.velocity = new Velocity(0, 0, this.position, app.ticker);
		this.sprite = new EntitySprite(assets.bulletSheet.textures[texture], this.position, 0.5, app.stage, app.ticker);
	}
}