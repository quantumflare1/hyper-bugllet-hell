import { Application, Assets, autoDetectRenderer, Sprite } from "pixi.js";
import Player from "./player.mjs";
import { init } from "./asset_manager.mjs";

(async () => {
	const app = await initializeApp();
	await init();

	const player = new Player(app);
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