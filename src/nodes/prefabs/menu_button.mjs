import ColliderNode from "../collider.mjs";
import MenuOption from "../menu_option.mjs";
import NineSliceSpriteNode from "../nine_slice_sprite.mjs";
import SpriteNode from "../sprite.mjs";
import TextNode from "../text.mjs";
import Prefab from "./prefab.mjs";

export default class MenuButton extends Prefab {
	option;
	collider;
	sprite;
	label;
	position;
	prevPosition;
	buttonLeft;
	buttonRight;
	buttonUp;
	buttonBottom;

	constructor(parent, position, option, collider, sprite, label) {
		super(parent);
		this.position = position;
		this.prevPosition = position;
		this.label = label;

		super.addChild(new MenuOption(this, option));
		super.addChild(new ColliderNode(this, parent.collisionManager, collider.range, collider.radius, collider.layer));
		super.addChild(new NineSliceSpriteNode(this, parent.display, sprite.texture, sprite.cornerSize, sprite.width, sprite.height, sprite.anchor));
		super.addChild(new TextNode(this, parent.display, label, 0.5)); // bleh
	}
	setLeftButton(btn) {
		this.buttonLeft = btn;
	}
	setRightButton(btn) {
		this.buttonRight = btn;
	}
	setUpButton(btn) {
		this.buttonUp = btn;
	}
	setDownButton(btn) {
		this.buttonDown = btn;
	}
}