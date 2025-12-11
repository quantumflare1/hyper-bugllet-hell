import Keys from "../constant_defs/key_constants.json" with { type: "json" };
import Component from "./component.mjs";

// todo: add cbf
export default class KeyInput extends Component {
	static id = "keyInput";

	keysPressed = new Set();
	keysHeld = new Set();
	constructor() {
		super();
		addEventListener("keydown", this.keydown.bind(this));
		addEventListener("keyup", this.keyup.bind(this));
	}
	keydown(e) {
		if (!e.repeating) {
			this.keysPressed.add(e.code);
			this.keysHeld.add(e.code);
		}
	}
	keyup(e) {
		this.keysPressed.delete(e.code);
		this.keysHeld.delete(e.code);
	}
	poll(key) {
		let response = 0;
		if (this.keysPressed.has(key)) {
			this.keysPressed.delete(key);
			response += Keys.pollResponse.KEY_PRESSED;
		}
		if (this.keysHeld.has(key)) {
			response += Keys.pollResponse.KEY_HELD;
		}
		return response;
	}
}