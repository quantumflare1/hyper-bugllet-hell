import Scene from "./core/scene.mjs";
import Vec2 from "./math/vec2.mjs";
import Bullet from "./nodes/prefabs/bullet.mjs";
import Enemy from "./nodes/prefabs/enemy.mjs";
import Player from "./nodes/prefabs/player.mjs";
import StatDisplay from "./nodes/prefabs/stat_display.mjs";

export default function main(app) {
	const scene = new Scene(app.stage);
	const player = new Player(scene, new Vec2(240, 240), 5);
	new Enemy(scene, new Vec2(240, 80), "test_enemy");
	new StatDisplay(scene, player, "health", new Vec2(475, 5), new Vec2(1, 0));
}