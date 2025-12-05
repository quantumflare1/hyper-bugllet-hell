import { Application } from "pixi.js";
import Bullet from "./bullet.mjs";
import CollisionManager from "./component/collision_manager.mjs";
import Player from "./player.mjs";

export default class Scene {
	collisionMgr;
	app;

	/**
	 * @param {Application} app 
	 */
	constructor(app) {
		this.app = app;
		this.collisionMgr = new CollisionManager(this);
	}
	init() {
		new Player(this);
		new Bullet(this, 200, 200, 0, 0, "test_bullet.png");
		new Bullet(this, 250, 100, 10, 30, "test_big_bullet.png");
	}
}