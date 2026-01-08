import Level from "./levels/level.mjs";
import Vec2 from "./math/vec2.mjs";
import Menu from "./menus/menu.mjs";
import Player from "./nodes/prefabs/player.mjs";
import StatDisplay from "./nodes/prefabs/stat_display.mjs";

export default function main(app) {
	/*
	const scene = new Level(app.stage, "test");
	const player = new Player(scene, new Vec2(240, 240), 3);
	scene.addPlayer(player);
	new StatDisplay(scene, player, "health", new Vec2(475, 5), new Vec2(1, 0));
	new StatDisplay(scene, player, "score", new Vec2(475, 25), new Vec2(1, 0));*/

	const scene = new Menu(app.stage, "main");
}