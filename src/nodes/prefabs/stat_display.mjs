import { BitmapText } from "pixi.js";
import Prefab from "./prefab.mjs";

export default class StatDisplay extends Prefab {
	trackedEntity;
	property;
	text;

	constructor(parent, entity, property, position, anchor = 0.5) {
		super(parent);
		this.trackedEntity = entity;
		this.property = property;
		this.text = new BitmapText({
			text: property,
			style: {
				fontFamily: "Not Jam Laika 11",
				fontSize: 11,
				fill: 0xffffff
			}
		});

		this.text.anchor = anchor;
		this.text.position.set(position.x, position.y);
		parent.display.addChild(this.text);
	}
	tick(ticker) {
		this.text.text = `${this.property}: ${this.trackedEntity[this.property]}`;
	}
}