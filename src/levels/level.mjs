import Scene from "../core/scene.mjs";
import StateMachine from "../nodes/state_machine.mjs";
import { BitmapText } from "pixi.js";

export default class Level extends Scene {
	enemies = new Set();

	constructor(display, id) {
		super(display);

		const self = this;
		import(`./level_${id}.mjs`).then((res) => {
			self.addChild(new StateMachine(self, ...res.default));
		});
		addEventListener("game_playerdefeat", this.lose.bind(this));
	}
	addPlayer(player) {
		this.addChild(player);
		this.player = player;
	}
	lose() {
		const text = new BitmapText({
			text: "YOU SNOOZE YOU LOSE!",
			style: {
				fontFamily: "Not Jam Laika 11",
				fontSize: 11,
				fill: 0xffffff
			}
		});
		text.position.set(20, 20);
		this.display.addChild(text);

		this.pause();
	}
}