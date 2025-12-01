import { Assets } from "pixi.js";

const assets = {};

async function init() {
	// make this read from a json of assets later
	assets.player = await Assets.load("../assets/player_temp.png");
	assets.bulletSheet = await Assets.load("../assets/spritesheet/bullets.json");
}

export { init, assets };