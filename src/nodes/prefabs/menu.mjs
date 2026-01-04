import Prefab from "./prefab.mjs";
import { clamp } from "../../math/utils.mjs";

export default class MenuPage extends Prefab {
	buttons = [];
	left = [];
	right = [];
	up = [];
	down = [];
	selectedButton = 0;

	constructor(parent, ...buttons) {
		super(parent);
		buttons.push(...buttons);
		this.generateButtonGraph();
	}
	generateButtonGraph() {
		const ltr = this.buttons.slice(0, -1);
		const ttb = this.buttons.slice(0, -1);
		ltr.sort(this.#ltrCompare);
		ttb.sort(this.#ttbCompare);

		for (let i = 0; i < this.buttons.length; i++) {
			this.left[this.buttons.indexOf(ltr[i])] = this.buttons.indexOf(ltr[i === 0 ? (this.buttons.length - 1) : (i - 1)]);
			this.right[this.buttons.indexOf(ltr[i])] = this.buttons.indexOf(ltr[i === this.buttons.length ? 0 : (i + 1)]);
			this.top[this.buttons.indexOf(ttb[i])] = this.buttons.indexOf(ttb[i === 0 ? (this.buttons.length - 1) : (i - 1)]);
			this.down[this.buttons.indexOf(ttb[i])] = this.buttons.indexOf(ttb[i === this.buttons.length ? 0 : (i + 1)]);
		}
	}
	#ltrCompare(a, b) {
		return a.position.x - b.position.x;
	}
	#ttbCompare(a, b) {
		return a.position.y - b.position.y;
	}
}