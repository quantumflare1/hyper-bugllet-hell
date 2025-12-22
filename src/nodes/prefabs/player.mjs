import ColliderNode from "../collider.mjs";
import Vec2 from "../../math/vec2.mjs";
import PlayerConstants from "../../constant_defs/player_constants.json" with { type: "json" };
import SpriteNode from "../sprite.mjs";
import Prefab from "./prefab.mjs";
import { keys } from "../../core/input_handler.mjs";
import { assets } from "../../core/asset_manager.mjs";
import Bullet from "./bullet.mjs";
import BulletData from "../../data/bullets.json";
import { clamp } from "../../math/utils.mjs";

export default class Player extends Prefab {
	position;
	velocity;
	health;
	attackCooldown;
	remainingAttackCooldown;
	
	constructor(parent, position, velocity, health) {
		super(parent);
		this.position = position;
		this.velocity = velocity;
		this.health = health;
		this.attackCooldown = PlayerConstants.BASE_ATTACK_COOLDOWN;
		this.remainingAttackCooldown = 0;

		const hitboxPos = new Vec2(PlayerConstants.HITBOX_OFFSET_X, PlayerConstants.HITBOX_OFFSET_Y);
		super.addChild(new ColliderNode(this, parent.collisionManager, position, hitboxPos, PlayerConstants.HITBOX_RADIUS, 0));
		super.addChild(new SpriteNode(this, parent.display, assets.player, 0.5));
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

		this.position.x += this.velocity.x * ticker.deltaMS / 1000;
		this.position.y += this.velocity.y * ticker.deltaMS / 1000;

		clamp(this.position.x, 10, 470);
		clamp(this.position.y, 10, 470);

		if (keys.has("KeyZ")) {
			if (this.remainingAttackCooldown <= 0) {
				this.remainingAttackCooldown = this.attackCooldown;
				new Bullet(this.parent, this.position.copy(), new Vec2(0, -960), "playerBullet");
			}
		}
	}
}