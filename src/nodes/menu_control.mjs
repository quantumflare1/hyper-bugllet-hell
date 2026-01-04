import Node from "./node.mjs";
import { pressedKeys } from "../core/input_handler.mjs";

export default class MenuControl extends Node {
	tick(ticker) {
		if (pressedKeys.has("ArrowUp")) {
			this.parent.selectedButton = this.parent.up[this.parent.selectedButton];
		}
		if (pressedKeys.has("ArrowDown")) {
			this.parent.selectedButton = this.parent.down[this.parent.selectedButton];
		}
		if (pressedKeys.has("ArrowRight")) {
			this.parent.selectedButton = this.parent.right[this.parent.selectedButton];
		}
		if (pressedKeys.has("ArrowLeft")) {
			this.parent.selectedButton = this.parent.left[this.parent.selectedButton];
		}
	}
}