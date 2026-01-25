import Node from "./node.mjs";
import { keys } from "../core/input_handler.mjs";

export default class MenuControl extends Node {
	upPressed = false;
	downPressed = false;
	leftPressed = false;
	rightPressed = false;
	selectPressed = false;

	tick(ticker) {
		if (keys.has("ArrowUp")) {
			if (!this.upPressed) {
				this.parent.selectedButton = this.parent.up[this.parent.selectedButton];
				this.upPressed = true;
			}
		}
		else {
			this.upPressed = false;
		}
		if (keys.has("ArrowDown")) {
			if (!this.downPressed) {
				this.parent.selectedButton = this.parent.down[this.parent.selectedButton];
				this.downPressed = true;
			}
		}
		else {
			this.downPressed = false;
		}
		if (keys.has("ArrowRight")) {
			if (!this.rightPressed) {
				this.parent.selectedButton = this.parent.right[this.parent.selectedButton];
				this.rightPressed = true;
			}
		}
		else {
			this.rightPressed = false;
		}
		if (keys.has("ArrowLeft")) {
			if (!this.leftPressed) {
				this.parent.selectedButton = this.parent.left[this.parent.selectedButton];
				this.leftPressed = true;
			}
		}
		else {
			this.leftPressed = false;
		}
		if (keys.has("KeyZ")) {
			if (!this.selectPressed) {
				this.parent.selectedButton.execute();
				this.selectPressed = true;
			}
		}
		else {
			this.selectPressed = false;
		}
	}
}