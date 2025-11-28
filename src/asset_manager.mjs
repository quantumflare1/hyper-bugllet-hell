import { Assets } from "pixi.js";

const assets = {};

async function init() {
	// make this read from a json of assets later
	assets.player = await Assets.load("../public/assets/player_temp.png");
}

export { init, assets };