import { BitmapText, Text } from "pixi.js";
import Node from "./node.mjs";

export default class TextNode extends Node {
	text;

	constructor(parent, stage, text, anchor = 0) {
		super(parent);
		parent.text = this;
		this.position = parent.position;

		this.text = new BitmapText({
			text: text,
			style: {
				fontFamily: "Not Jam Laika 11",
				fontSize: 11,
				fill: 0xffffff
			}
		});

		this.text.anchor = anchor;
		this.text.roundPixels = true;
		this.text.position.set(this.position.x, this.position.y);

		stage.addChild(this.text);

	}
	destroy() {
		this.text.destroy();
	}
	setText(newText) {
		this.text.text = newText;
	}
	tick(ticker) {
		super.tick(ticker);
		this.text.position.set(this.position.x, this.position.y);
	}
}