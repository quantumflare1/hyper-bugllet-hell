import MenuButton from "../nodes/prefabs/menu_button.mjs";
import Vec2 from "../math/vec2.mjs";
import { assets } from "../core/asset_manager.mjs";

const menus = [
	[
		[new Vec2(30, 20), () => { this.parent.parent.state.currentState = 1; console.log("weiner"); }, { range: new Vec2(20, 0), radius: 10, layer: 0 }, { texture: assets.button, cornerSize: 8, width: 60, height: 20, anchor: 0.5 }, "Hi"]
	]
];

// 0
function noMenu() {
	// should initialize all the menus yk
	for (const i of menus) {
		this.menus.push(i);
		for (const btn of i) {
			this.addChild(new MenuButton(this, ...btn));
		}
	}
	return 1;
}

// 1
function nothing() {
	return 1;
}

// also todo: add timer node stuff

// all menus are just an array of buttons
// 

export default [noMenu, nothing];