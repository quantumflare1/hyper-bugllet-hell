import Scene from "./core/scene.mjs";
import Level from "./levels/level.mjs";
import Vec2 from "./math/vec2.mjs";
import Enemy from "./nodes/prefabs/enemy.mjs";
import Player from "./nodes/prefabs/player.mjs";
import StatDisplay from "./nodes/prefabs/stat_display.mjs";

export default function main(app) {
	const scene = new Level(app.stage, "test_level");
	const player = new Player(scene, new Vec2(240, 240), 3);
	new StatDisplay(scene, player, "health", new Vec2(475, 5), new Vec2(1, 0));
	new StatDisplay(scene, player, "score", new Vec2(475, 25), new Vec2(1, 0));
}