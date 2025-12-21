import ColliderNode from "../collider.mjs";
import SpriteNode from "../sprite.mjs";
import Prefab from "./prefab.mjs";
import { assets } from "../../core/asset_manager.mjs";

export default class Bullet extends Prefab {
	position;
	velocity;

	constructor(parent, position, velocity, hitbox, sprite, behavior) {
		super(parent);
		this.position = position;
		this.velocity = velocity;

		super.addChild(new ColliderNode(this, hitbox.cap, hitbox.butt, hitbox.radius, hitbox.layer));
		super.addChild(new SpriteNode(this, parent.display, assets.bulletSheet.textures[sprite], 0.5));
		//super.addChild(behavior); // still not totally sure how behaviors will work
	}
	tick(ticker) {
		super.tick(ticker);

		// placeholder behavior
		this.position.x += this.velocity.x * ticker.deltaMS / 1000;
		this.position.y += this.velocity.y * ticker.deltaMS / 1000;
	}
}