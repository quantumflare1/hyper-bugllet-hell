import Node from "./node.mjs";
import { keys } from "../core/input_handler.mjs";
import PlayerConstants from "../constant_defs/player_constants.json" with { type: "json" };

export default class PlayerControl extends Node {
	tick(ticker) {
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

		this.parent.velocity.x = netVelocityX;
		this.parent.velocity.y = netVelocityY;
		
		this.parent.isShooting = keys.has("KeyZ");
	}
}