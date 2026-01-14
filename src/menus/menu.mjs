import Scene from "../core/scene.mjs";
import StateMachine from "../nodes/state_machine.mjs";
import { keys } from "../core/input_handler.mjs";
import Vec2 from "../math/vec2.mjs";
import ColliderNode from "../nodes/collider.mjs";

export default class Menu extends Scene {
	menus = [];
	currentMenu = 0;
	selectedButton;
	
	upPressed = false;
	downPressed = false;
	leftPressed = false;
	rightPressed = false;
	selectPressed = false;



	constructor(display, id) {
		super(display);

		const self = this;
		import(`./menu_${id}.mjs`).then((res) => {
			self.addChild(new StateMachine(self, ...res.default));
		});
	}
	tick(ticker) {
		super.tick(ticker);

		if (this.state)
			this.currentMenu = this.state.currentState;

		// input handling garbage
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