import { Application, Assets, Sprite } from "pixi.js";

(async () => {
	const app = new Application();

	await app.init({
		background: "#1099bb",
		width: 480,
		height: 480
	});

	document.getElementById("pixi-container").appendChild(app.canvas);

	const texture = await Assets.load("/assets/bunny.png");

	const bunny = new Sprite(texture);

	bunny.anchor.set(0.5);

	bunny.position.set(app.screen.width / 2, app.screen.height / 2);

	app.stage.addChild(bunny);

	app.ticker.add((time) => {
		// Just for fun, let's rotate mr rabbit a little.
		// * Delta is 1 if running at 100% performance *
		// * Creates frame-independent transformation *
		bunny.rotation += 0.1 * time.deltaTime;
	});
})();
