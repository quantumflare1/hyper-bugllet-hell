import Vec2 from "../../math/vec2.mjs";
import ButtonRectNode from "../button_rect.mjs";
import NineSliceSpriteNode from "../nine_slice_sprite.mjs";
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
	heldDown;

	constructor(parent, position, dimensions, action, sprite, label) {
		super(parent);
		this.position = position;
		this.prevPosition = position;
		this.label = label;
		this.heldDown = false;

		this.execute = action;
		super.addChild(new ButtonRectNode(this, dimensions));
		super.addChild(new NineSliceSpriteNode(this, parent.display, sprite.texture, sprite.cornerSize, sprite.width, sprite.height, sprite.anchor));
		super.addChild(new TextNode(this, parent.display, label, 0.5)); // bleh
		console.log(this.sprite.source)
		this.sprite.source.eventMode = "static";
		this.sprite.source.onpointerdown = this.execute.bind(this);
		this.sprite.source.onpointerover = this.highlight.bind(this);
		this.sprite.source.onpointerout = this.dehighlight.bind(this);
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
	highlight(event) {
		this.text.text.tint = 0xffff00;
	}
	dehighlight(event) {
		this.text.text.tint = 0xffffff;
	}
}