import Prefab from "./prefab.mjs";
import ColliderNode from "../collider.mjs";
import SpriteNode from "../sprite.mjs";
import Vec2 from "../../math/vec2.mjs";
import { assets } from "../../core/asset_manager.mjs";
import StateMachine from "../state_machine.mjs";
import { moveToRandomPosition, wait } from "../../behaviors/test_enemy.mjs";

export default class Enemy extends Prefab {
	position;
	velocity;
	health;

	constructor(parent, position, velocity, health) {
		super(parent);
		this.position = position;
		this.velocity = velocity;
		this.health = health;

		super.addChild(new ColliderNode(this, parent.collisionManager, position, new Vec2(0, 0), 10, 0));
		super.addChild(new SpriteNode(this, parent.display, assets.enemy, 0.5));
		super.addChild(new StateMachine(this, moveToRandomPosition, wait));
	}
	tick(ticker) {
		super.tick(ticker);
		
		this.position.x += this.velocity.x * ticker.deltaMS / 1000;
		this.position.y += this.velocity.y * ticker.deltaMS / 1000;
	}
}