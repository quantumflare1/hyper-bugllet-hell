import ColliderNode from "../collider.mjs";
import MenuOption from "../menu_option.mjs";
import SpriteNode from "../sprite.mjs";
import Prefab from "./prefab.mjs";

export default class MenuButton extends Prefab {
	option;
	collider;
	sprite;
	label;
	position;

	constructor(parent, position, option, collider, sprite, label) {
		super(parent);
		this.position = position;
		this.label = label;

		super.addChild(new MenuOption(this, option));
		super.addChild(new ColliderNode(this, parent.collisionManager, collider.range, collider.radius, collider.layer));
		super.addChild(new SpriteNode(this, parent.display, sprite.texture, sprite.anchor));
	}
}