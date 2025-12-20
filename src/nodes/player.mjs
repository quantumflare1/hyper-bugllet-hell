import ColliderNode from "./collider.mjs";
import Node from "./node.mjs";
import Vec2 from "../math/vec2.mjs";
import PlayerConstants from "../constant_defs/player_constants.json" with { type: "json" };
import SpriteNode from "./sprite.mjs";
import Prefab from "./prefab.mjs";

export default class PlayerNode extends Prefab {
	position;
	velocity;
	
	constructor(parent, position, velocity) {
		super(parent);
		console.log(parent)
		this.position = position;
		this.velocity = velocity;
		super.addChild(new ColliderNode(this, new Vec2(PlayerConstants.HITBOX_OFFSET_X, PlayerConstants.HITBOX_OFFSET_Y), new Vec2(PlayerConstants.HITBOX_OFFSET_X, PlayerConstants.HITBOX_OFFSET_Y), PlayerConstants.HITBOX_RADIUS, 0));
		super.addChild(new SpriteNode(this, parent.display, "player", position, 0.5));
	}
	tick(ticker) {
		super.tick(ticker);
	}
}