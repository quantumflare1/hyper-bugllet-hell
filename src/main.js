import { Application } from "pixi.js";
//import * as CDebug from "../debug/collision.mjs";
//import * as EDebug from "../debug/entity.mjs";
import * as AssetManager from "./asset_manager.mjs";
import Scene from "./scene.mjs";

// perhaps move init logic to a different file idk
(async () => {
	const app = await initializeApp();
	await AssetManager.init();

	const scene = new Scene(app);
	scene.init();
})();

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