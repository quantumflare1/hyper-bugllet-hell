import MenuButton from "../nodes/prefabs/menu_button.mjs";
import Vec2 from "../math/vec2.mjs";
import { assets } from "../core/asset_manager.mjs";
import { swapScenes, stage } from "../game.mjs";
import Level from "../levels/level.mjs";

const menus = [
	[
		{
			position: new Vec2(40, 40),
			dimensions: new Vec2(60, 20),
			action: (event) => { swapScenes(new Level(stage, "test")); },
			sprite: { texture: assets.button, cornerSize: 8, width: 60, height: 20, anchor: 0.5 },
			label: "Start"
		}
	]
];

// 0
function noMenu() {
	// should initialize all the menus yk
	this.menus.push([]);
	let menuCount = 0;
	for (const i of menus) {
		this.menus.push([]);
		menuCount++;
		for (const btn of i) {
			const button = new MenuButton(this, btn.position, btn.dimensions, btn.action, btn.sprite, btn.label);
			this.menus[menuCount].push(button);
			this.addChild(button);
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