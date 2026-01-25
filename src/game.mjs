import { keys, mouse, init as initInput } from "./core/input_handler.mjs";
import { init as initAssets } from "./core/asset_manager.mjs";
import { Application } from "pixi.js";
import main from "./main_scene.mjs";
import GlobalConstants from "./constant_defs/global_constants.json";

let activeScene;
let stage;

async function init() {
	await initAssets();
	await initializeApp();
	initInput();

	activeScene = main();
}

async function initializeApp() {
	const app = new Application();

	await app.init({
		background: 0x111111,
		width: GlobalConstants.FIELD_WIDTH,
		height: GlobalConstants.FIELD_HEIGHT
	});

	document.getElementById("pixi-container").appendChild(app.canvas);
	stage = app.stage;
	//return app;
}

function swapScenes(newScene) {
	activeScene.unload();
	activeScene = newScene;
	newScene.reload();
}

export { init, swapScenes, stage };