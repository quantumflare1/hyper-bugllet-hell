import { Assets } from "pixi.js";

const assets = {};

async function init() {
	// make this read from a json of assets later
	assets.player = await Assets.load("../assets/player_temp.png");
	assets.playerDamaged = await Assets.load("../assets/player_damage.png");
	assets.bulletSheet = await Assets.load("../assets/spritesheet/bullets.json");
	assets.enemy = await Assets.load("../assets/enemy_temp.png");
	assets.font = await Assets.load("../assets/fonts/NotJamLaika11.fnt");
}

export { init, assets };