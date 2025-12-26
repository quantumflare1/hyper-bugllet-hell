import Vec2 from "../../math/vec2.mjs";
import ColliderNode from "../collider.mjs";
import SpriteNode from "../sprite.mjs";
import Prefab from "./prefab.mjs";

export default class Actor extends Prefab {
	position;
	velocity;
	prevPosition;
	health;

	constructor(parent, position, health, collider, sprite) {
		super(parent);
		this.position = position;
		this.prevPosition = position;
		this.velocity = new Vec2(0, 0);
		this.health = health;
		
		super.addChild(new ColliderNode(this, parent.collisionManager, collider.range, collider.radius, collider.layer));
		super.addChild(new SpriteNode(this, parent.display, sprite.texture, sprite.anchor));
	}
	// define tick() in subclass
	move(ticker) {
		this.prevPosition.x = this.position.x;
		this.prevPosition.y = this.position.y;

		this.position.x += this.velocity.x * ticker.deltaMS / 1000;
		this.position.y += this.velocity.y * ticker.deltaMS / 1000;
	}
}