import Position from "./component/position.mjs";
import Velocity from "./component/velocity.mjs";
import Entity from "./entity.mjs";
import Scene from "./scene.mjs";
import EntitySprite from "./component/sprite.mjs";
import Collider from "./component/collider.mjs";
import { assets } from "./asset_manager.mjs";
import AI from "./component/ai.mjs";
import idle from "./behavior/idle.mjs";
import move from "./behavior/move.mjs";

// todo: probably should implement state machines at some point 
export default class Enemy extends Entity {
	/**
	 * @param {Scene} scene 
	 */
	constructor(scene, posX, posY, velX, velY) {
		const pos = new Position(posX, posY);
		const vel = new Velocity(velX, velY, pos, scene.app.ticker);
		const spr = new EntitySprite(assets.enemy, pos, 0.5, scene.app.stage, scene.app.ticker);
		const col = new Collider(scene.collisionMgr, scene.app.ticker, 8, 0, 0, 0, 0, pos, 1, 2);
		super(pos, vel, spr, col);
		super.addComponent(new AI(scene.app.ticker, this, 0, idle, move));
	}
	/*
	able to move around
	change between states
	*/
}
/*
 * MOST MOST BASIC TEST ENEMY AI EVER
 * 
 * Idle state: pick a point, remember it, enter moving state
 * Moving state: Move towards remembered point at constant speed; if point reached, go to attacking state
 * Attacking state: Fire bullet, go back to idle state
 * Start in idle state
 */