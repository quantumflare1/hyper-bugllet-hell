import Vec2 from "../../math/vec2.mjs";
import { assets } from "../../core/asset_manager.mjs";
import StateMachine from "../state_machine.mjs";
import Actor from "./actor.mjs";
import EnemyData from "../../data/enemy_data.json";
import Bullet from "./bullet.mjs";

export default class Enemy extends Actor {
	constructor(parent, position, id) {
		const hitbox = {
			range: new Vec2(EnemyData[id].hitbox.rangeX, EnemyData[id].hitbox.rangeY),
			radius: EnemyData[id].hitbox.radius,
			layer: 1
		};
		const sprite = {
			texture: assets[EnemyData[id].sprite],
			anchor: 0.5
		};
		super(parent, position, EnemyData[id].health, hitbox, sprite);

		const self = this;
		import(`../../behaviors/enemy_${id}.mjs`).then((res) => {
			self.addChild(new StateMachine(self, ...res.default));
		});
	}
	tick(ticker) {
		super.tick(ticker);
		
		super.move(ticker);

		for (const i of this.parent.collisionManager.colliding(this.collider)) {
			if (i.parent instanceof Bullet && !i.parent.alreadyCollided.has(this)) {
				i.parent.alreadyCollided.add(this);
				this.health -= i.parent.health;
			}
		}
		if (this.health <= 0) {
			this.despawn();
			dispatchEvent(new CustomEvent("game_enemydefeat", { detail: 1 }))
		}
	}
}