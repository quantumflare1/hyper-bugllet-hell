import { Application, Assets, autoDetectRenderer, Sprite } from "pixi.js";
import Player from "./player.mjs";
import * as AssetManager from "./asset_manager.mjs";
import Bullet from "./bullet.mjs";
import Scene from "./scene.mjs";

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