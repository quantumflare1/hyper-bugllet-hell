import { Application } from "pixi.js";
import Position from "./component/position.mjs";
import Velocity from "./component/velocity.mjs";
import EntitySprite from "./component/sprite.mjs";
import { assets } from "./asset_manager.mjs";
import Scene from "./scene.mjs";
import Collider from "./component/collider.mjs";

export default class Bullet {
	position;
	velocity;
	collider;
	sprite;
	
	/**
	 * @param {Scene} scene 
	 */
	constructor(scene, posX, posY, texture) {
		this.position = new Position(posX, posY);
		this.velocity = new Velocity(0, 0, this.position, scene.app.ticker);
		this.sprite = new EntitySprite(assets.bulletSheet.textures[texture], this.position, 0.5, scene.app.stage, scene.app.ticker);
		this.collider = new Collider(scene.collisionMgr, scene.app.ticker, 6, 6, 6, 6, 6, this.position, 1, 0);
	}
}