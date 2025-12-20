import Scene from "./core/scene.mjs";
import Vec2 from "./math/vec2.mjs";
import PlayerNode from "./nodes/player.mjs";

export default function main(app) {
	const scene = new Scene(app.stage);
	new PlayerNode(scene, new Vec2(240, 240), new Vec2(0, 0));
}