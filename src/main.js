import { Application, Assets, Sprite } from "pixi.js";
import createPlayer from "./player.mjs";

(async () => {
	// todo: move this out into its own function
	const app = new Application();

	await app.init({
		background: "#1099bb",
		width: 480,
		height: 480
	});

	document.getElementById("pixi-container").appendChild(app.canvas);

	const player = createPlayer(app);

	app.ticker.add((time) => {
		player.tick(time);
	});
})();
