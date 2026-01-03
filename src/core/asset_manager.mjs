import { Assets } from "pixi.js";
import assetPaths from "../assets.json" with { type: "json" };

const assets = {};

async function init() {
	for (const key in assetPaths) {
		assets[key] = await Assets.load(`../assets/${assetPaths[key]}`);
	}
}

export { init, assets };