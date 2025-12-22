import ColliderNode from "../collider.mjs";
import SpriteNode from "../sprite.mjs";
import Prefab from "./prefab.mjs";
import Vec2 from "../../math/vec2.mjs";
import { assets } from "../../core/asset_manager.mjs";
import BulletData from "../../data/bullets.json" with { type: "json" };

export default class Bullet extends Prefab {
	position;
	velocity;

	static convertJSONToHitbox(data) {
		return {
			cap: new Vec2(data.cap[0], data.cap[1]),
			butt: new Vec2(data.butt[0], data.butt[1]),
			radius: data.radius,
			layer: data.layer
		};
	}
	constructor(parent, position, velocity, id, behavior) {
		super(parent);
		this.position = position;
		this.velocity = velocity;

		const hitbox = {
			//cap: new Vec2(BulletData[id].hitbox.cap[0], BulletData[id].hitbox.cap[1]),
			butt: new Vec2(BulletData[id].hitbox.butt[0], BulletData[id].hitbox.butt[1]),
			radius: BulletData[id].hitbox.radius,
			layer: BulletData[id].hitbox.layer
		};

		super.addChild(new ColliderNode(this, parent.collisionManager, position, hitbox.butt, hitbox.radius, hitbox.layer));
		super.addChild(new SpriteNode(this, parent.display, assets.bulletSheet.textures[BulletData[id].sprite], 0.5));
		//super.addChild(behavior); // still not totally sure how behaviors will work
	}
	tick(ticker) {
		super.tick(ticker);

		// placeholder behavior
		this.position.x += this.velocity.x * ticker.deltaMS / 1000;
		this.position.y += this.velocity.y * ticker.deltaMS / 1000;
	}
}