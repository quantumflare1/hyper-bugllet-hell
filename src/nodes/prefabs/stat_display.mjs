import { BitmapText } from "pixi.js";
import Prefab from "./prefab.mjs";
import TextNode from "../text.mjs";

export default class StatDisplay extends Prefab {
	trackedEntity;
	property;
	position;

	constructor(parent, entity, property, position, anchor = 0.5) {
		super(parent);
		this.trackedEntity = entity;
		this.property = property;
		this.position = position;

		super.addChild(new TextNode(this, parent.display, property, anchor));
	}
	tick(ticker) {
		this.text.setText(`${this.property}: ${this.trackedEntity[this.property]}`);
	}
}