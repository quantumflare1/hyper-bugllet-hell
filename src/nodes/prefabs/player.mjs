import ColliderNode from "../collider.mjs";
import Vec2 from "../../math/vec2.mjs";
import PlayerConstants from "../../constant_defs/player_constants.json" with { type: "json" };
import SpriteNode from "../sprite.mjs";
import Prefab from "./prefab.mjs";
import { keys } from "../../core/input_handler.mjs";
import { assets } from "../../core/asset_manager.mjs";

export default class PlayerNode extends Prefab {
	position;
	velocity;
	
	constructor(parent, position, velocity) {
		super(parent);
		this.position = position;
		this.velocity = velocity;

		const hitboxPos = new Vec2(PlayerConstants.HITBOX_OFFSET_X, PlayerConstants.HITBOX_OFFSET_Y);
		super.addChild(new ColliderNode(this, hitboxPos, hitboxPos, PlayerConstants.HITBOX_RADIUS, 0));
		super.addChild(new SpriteNode(this, parent.display, assets.player, 0.5));
	}
	tick(ticker) {
		super.tick(ticker);

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
	}
}