import Vec2 from "../../math/vec2.mjs";
import PlayerConstants from "../../constant_defs/player_constants.json" with { type: "json" };
import { assets } from "../../core/asset_manager.mjs";
import Bullet from "./bullet.mjs";
import Actor from "./actor.mjs";
import { BitmapText } from "pixi.js";
import PlayerControl from "../player_movement.mjs";

export default class Player extends Actor {
	attackCooldown;
	remainingAttackCooldown;
	isShooting;
	controls;
	score;
	
	constructor(parent, position, health) {
		const hitbox = {
			range: new Vec2(PlayerConstants.HITBOX_OFFSET_X, PlayerConstants.HITBOX_OFFSET_Y),
			radius: PlayerConstants.HITBOX_RADIUS,
			layer: 0
		};
		const sprite = {
			texture: assets.player,
			anchor: 0.5
		};
		super(parent, position, new Vec2(0, 0), health, hitbox, sprite);

		this.controls = new PlayerControl(this);
		this.addChild(this.controls);
		this.attackCooldown = PlayerConstants.BASE_ATTACK_COOLDOWN;
		this.remainingAttackCooldown = 0;
		this.isShooting = false;
		this.score = 0;

		addEventListener("game_enemydefeat", this.scoreUp.bind(this));
	}
	scoreUp(e) {
		this.score += e.detail;
	}
	tick(ticker) {
		super.tick(ticker);

		this.remainingAttackCooldown -= ticker.deltaMS;

		super.move(ticker);

		if (this.isShooting && this.remainingAttackCooldown <= 0) {
			this.remainingAttackCooldown = this.attackCooldown;
			new Bullet(this.parent, this.position.copy(), new Vec2(0, -960), "player");
		}

		for (const i of this.parent.collisionManager.colliding(this.collider)) {
			if (i.parent instanceof Bullet && !i.parent.alreadyCollided.has(this)) {
				i.parent.alreadyCollided.add(this);
				this.health -= i.parent.health;
				console.log("OW OW OW");

				if (this.health <= 0) {
					dispatchEvent(new Event("game_playerdefeat"));
				}
			}
		}
	}
}