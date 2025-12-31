import Scene from "../core/scene.mjs";
import StateMachine from "../nodes/state_machine.mjs";

export default class Level extends Scene {
	enemies = new Set();

	constructor(display, id) {
		super(display);

		const self = this;
		import(`./level_${id}.mjs`).then((res) => {
			self.addChild(new StateMachine(self, ...res.default));
		});
	}
	addPlayer(player) {
		this.addChild(player);
		this.player = player;
	}
}