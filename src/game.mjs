import { keys, mouse } from "./core/input_handler.mjs";
import { init as initAssets } from "./core/asset_manager.mjs";
import { Application } from "pixi.js";
import main from "./main_scene.mjs";

async function init() {
	await initAssets();
	const app = initializeApp();

	const scene = main(app);
}

async function initializeApp() {
	const app = new Application();

	await app.init({
		background: 0x111111,
		width: 480,
		height: 480
	});

	document.getElementById("pixi-container").appendChild(app.canvas);
	return app;
}

export { init, keys, mouse };