import ColliderNode from "../collider.mjs";
import SpriteNode from "../sprite.mjs";
import Vec2 from "../../math/vec2.mjs";
import { assets } from "../../core/asset_manager.mjs";
import StateMachine from "../state_machine.mjs";
import { moveToRandomPosition, wait } from "../../behaviors/test_enemy.mjs";
import Actor from "./actor.mjs";

export default class Enemy extends Actor {
	constructor(parent, position, velocity, health) {
		const hitbox = { // put all this in a json later
			range: new Vec2(0, 0),
			radius: 10,
			layer: 1
		};
		const sprite = {
			texture: assets.enemy,
			anchor: 0.5
		};
		super(parent, position, velocity, health, hitbox, sprite);

		super.addChild(new StateMachine(this, moveToRandomPosition, wait));
	}
	tick(ticker) {
		super.tick(ticker);
		
		super.move(ticker);

		for (const i of this.parent.collisionManager.colliding(this.collider)) {
			this.health--;
			console.log("ow i am at " + this.health + " health")
		}
		if (this.health <= 0) {
			this.parent.removeChild(this);
			this.sprite.destroy();
		}
	}
}