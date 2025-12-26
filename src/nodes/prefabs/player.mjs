import Vec2 from "../../math/vec2.mjs";
import PlayerConstants from "../../constant_defs/player_constants.json" with { type: "json" };
import { keys } from "../../core/input_handler.mjs";
import { assets } from "../../core/asset_manager.mjs";
import Bullet from "./bullet.mjs";
import Actor from "./actor.mjs";

export default class Player extends Actor {
	attackCooldown;
	remainingAttackCooldown;
	
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
		super(parent, position, health, hitbox, sprite);

		this.attackCooldown = PlayerConstants.BASE_ATTACK_COOLDOWN;
		this.remainingAttackCooldown = 0;

	}
	tick(ticker) {
		super.tick(ticker);

		this.remainingAttackCooldown -= ticker.deltaMS;

		let netVelocityX = 0;
		let netVelocityY = 0;
		if (keys.has("ArrowUp")) {
			netVelocityY -= PlayerConstants.BASE_MOVEMENT_SPEED;
		}
		if (keys.has("ArrowDown")) {
			netVelocityY += PlayerConstants.BASE_MOVEMENT_SPEED;
		}
		if (keys.has("ArrowLeft")) {
			netVelocityX -= PlayerConstants.BASE_MOVEMENT_SPEED;
		}
		if (keys.has("ArrowRight")) {
			netVelocityX += PlayerConstants.BASE_MOVEMENT_SPEED;
		}
		if (keys.has("ShiftLeft")) {
			netVelocityX *= PlayerConstants.FOCUS_MOVEMENT_MULTIPLIER;
			netVelocityY *= PlayerConstants.FOCUS_MOVEMENT_MULTIPLIER;
		}

		this.velocity.x = netVelocityX;
		this.velocity.y = netVelocityY;

		super.move(ticker);

		if (keys.has("KeyZ")) {
			if (this.remainingAttackCooldown <= 0) {
				this.remainingAttackCooldown = this.attackCooldown;
				new Bullet(this.parent, this.position.copy(), "base_player_bullet");
			}
		}

		for (const i of this.parent.collisionManager.colliding(this.collider)) {
			console.log("OW OW OW");
		}
	}
}