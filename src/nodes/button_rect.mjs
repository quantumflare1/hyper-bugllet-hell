import Node from "./node.mjs";
import Vec2 from "../math/vec2.mjs";

export default class ButtonRectNode extends Node {
	position;
	dimensions;

	constructor(parent, dimensions) {
		super(parent);
		parent.rect = this;
		this.dimensions = dimensions;

		this.position = parent.position.copy().subtract(dimensions.copy().divide(2));
	}
	hovering(cursor) {
		return cursor.x >= this.position.x && cursor.x < this.position.x + this.dimensions.x && cursor.y >= this.position.y && cursor.y < this.position.y + this.dimensions.y;
	}
}