import { Application, Assets, autoDetectRenderer, Sprite } from "pixi.js";
import Player from "./player.mjs";
import * as AssetManager from "./asset_manager.mjs";
import Bullet from "./bullet.mjs";

(async () => {
	const app = await initializeApp();
	await AssetManager.init();

	new Player(app);
	new Bullet(app, 200, 200, "test_bullet.png");
	new Bullet(app, 300, 200, "test_big_bullet.png");
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