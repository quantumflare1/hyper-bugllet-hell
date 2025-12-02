import { Application } from "pixi.js";
import Position from "./component/position.mjs";
import Velocity from "./component/velocity.mjs";
import EntitySprite from "./component/sprite.mjs";
import { assets } from "./asset_manager.mjs";
import Scene from "./scene.mjs";
import Collider from "./component/collider.mjs";
import TimeConstants from "./constant_defs/time_constants.json" with { type:"json" };

export default class Bullet {
	position;
	velocity;
	collider;
	sprite;
	
	/**
	 * @param {Scene} scene 
	 */
	constructor(scene, posX, posY, velX, velY, texture) {
		this.position = new Position(posX, posY);
		this.velocity = new Velocity(velX / TimeConstants.MS_PER_SECOND, velY / TimeConstants.MS_PER_SECOND, this.position, scene.app.ticker);
		this.sprite = new EntitySprite(assets.bulletSheet.textures[texture], this.position, 0.5, scene.app.stage, scene.app.ticker);
		this.collider = new Collider(scene.collisionMgr, scene.app.ticker, 8, 0, 0, 0, 0, this.position, 1, 0);
	}
}