import Scene from "./core/scene.mjs";
import Vec2 from "./math/vec2.mjs";
import Bullet from "./nodes/prefabs/bullet.mjs";
import Enemy from "./nodes/prefabs/enemy.mjs";
import Player from "./nodes/prefabs/player.mjs";

export default function main(app) {
	const scene = new Scene(app.stage);
	new Player(scene, new Vec2(240, 240), 5);
	new Bullet(scene, new Vec2(200, 200), "test_bullet");
	new Enemy(scene, new Vec2(240, 80), "test_enemy");

}