import Scene from "./core/scene.mjs";
import Vec2 from "./math/vec2.mjs";
import Bullet from "./nodes/prefabs/bullet.mjs";
import Player from "./nodes/prefabs/player.mjs";

const testBullet = {
	cap: new Vec2(0, 0),
	butt: new Vec2(0, 0),
	radius: 5,
	layer: 0
};

export default function main(app) {
	const scene = new Scene(app.stage);
	new Player(scene, new Vec2(240, 240), new Vec2(0, 0));
	new Bullet(scene, new Vec2(200, 200), new Vec2(40, -10), testBullet, "test_bullet.png"); // placeholders: replace with actual hitbox/sprite data
}