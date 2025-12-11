import { Application } from "pixi.js";
import Position from "./component/position.mjs";
import Velocity from "./component/velocity.mjs";
import EntitySprite from "./component/sprite.mjs";
import { assets } from "./asset_manager.mjs";
import Scene from "./scene.mjs";
import Collider from "./component/collider.mjs";
import Time from "./constant_defs/time_constants.json" with { type:"json" };
import Entity from "./entity.mjs";

export default class Bullet extends Entity {
	/**
	 * @param {Scene} scene 
	 */
	constructor(scene, posX, posY, velX, velY, texture) {
		const pos = new Position(posX, posY);
		const vel = new Velocity(velX / Time.MS_PER_SECOND, velY / Time.MS_PER_SECOND, pos, scene.app.ticker);
		const spr = new EntitySprite(assets.bulletSheet.textures[texture], pos, 0.5, scene.app.stage, scene.app.ticker);
		const col = new Collider(scene.collisionMgr, scene.app.ticker, 8, 0, 0, 0, 0, pos, 1, 0);
		super(pos, vel, spr, col);
	}
}