import Vec2 from "../../math/vec2.mjs";
import ColliderNode from "../collider.mjs";
import SpriteNode from "../sprite.mjs";
import Prefab from "./prefab.mjs";
import GlobalConstants from "../../constant_defs/global_constants.json" with { type: "json" };

const DEFAULT_DESPAWN_TIME = 500;

export default class Actor extends Prefab {
	position;
	velocity;
	prevPosition;
	health;

	despawnTimer;

	constructor(parent, position, velocity, health, collider, sprite) {
		super(parent);
		this.position = position;
		this.prevPosition = position;
		this.velocity = velocity;
		this.health = health;
		this.despawnTimer = 0;
		
		super.addChild(new ColliderNode(this, parent.collisionManager, collider.range, collider.radius, collider.layer));
		super.addChild(new SpriteNode(this, parent.display, sprite.texture, sprite.anchor));
	}
	tick(ticker) {
		super.tick(ticker);

		if (this.position.x < 0 || this.position.x > GlobalConstants.FIELD_WIDTH || this.position.y < 0 || this.position.y > GlobalConstants.FIELD_HEIGHT) {
			this.despawnTimer += ticker.deltaMS;
			if (this.despawnTimer > DEFAULT_DESPAWN_TIME) {
				this.despawn();
			}
		}
		else {
			this.despawnTimer = 0;
		}
	}
	move(ticker) {
		this.prevPosition.x = this.position.x;
		this.prevPosition.y = this.position.y;

		this.position.x += this.velocity.x * ticker.deltaMS / 1000;
		this.position.y += this.velocity.y * ticker.deltaMS / 1000;
	}
	despawn() {
		this.parent.removeChild(this);
		this.sprite.destroy();
	}
}