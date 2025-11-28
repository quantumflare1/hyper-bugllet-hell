import { Assets, Sprite } from "pixi.js";

export default async function createPlayer(app) {
	let position = { x: 240, y: 240 };
	let velocity = { x: 0, y: 0 };
	let texture = await Assets.load("/assets/player_temp.png");
	
	const sprite = new Sprite(texture);

	function tick(dt) {
		sprite.position.set(position.x, position.y);
	}

	return { position: position, velocity: velocity, sprite: sprite, tick: tick };
}