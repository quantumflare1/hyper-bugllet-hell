import Node from "./node.mjs";

export default class ColliderNode extends Node {
	position; range;
	layer;
	radius;
	manager;

	constructor(parent, manager, position, range, radius, layer) {
		super(parent);
		this.manager = manager;
		this.position = position;
		this.range = range;
		this.radius = radius;
		this.layer = layer;

		manager.addCollider(this);
	}
	collidesWith(other) {
		// stupid chud geometry
		const capToCap = other.position.copy();
		capToCap.subtract(other.range);
		capToCap.subtract(this.position);
		capToCap.subtract(this.range);
		const capToButt = other.position.copy();
		capToButt.add(other.range);
		capToButt.subtract(this.position);
		capToButt.subtract(this.range);
		const buttToCap = other.position.copy();
		buttToCap.subtract(other.range);
		buttToCap.subtract(this.position);
		buttToCap.add(this.range);
		const buttToButt = other.position.copy();
		buttToButt.add(other.range);
		buttToButt.subtract(this.position);
		buttToButt.add(this.range);
		const me = this.range.copy();
		me.subtract(this.position);
		const you = other.range.copy();
		you.subtract(other.position);

		const capToCapLength = capToCap.lengthSquared();
		const capToButtLength = capToButt.lengthSquared();
		const buttToCapLength = buttToCap.lengthSquared();
		const buttToButtLength = buttToButt.lengthSquared();
		const myLength = me.lengthSquared();
		const yourLength = you.lengthSquared();

		const myCapToOther = (yourLength === 0) ?
			capToCapLength - ((capToCapLength + yourLength - capToButtLength) ** 2 / (4 * yourLength)) :
			capToCapLength;
		const myButtToOther = (yourLength === 0) ?
			buttToCapLength - ((buttToCapLength + yourLength - buttToButtLength) ** 2 / (4 * yourLength)) :
			buttToCapLength;
		const yourCapToOther = (myLength === 0) ?
			capToCapLength - ((capToCapLength + myLength - buttToCapLength) ** 2 / (4 * myLength)) :
			capToCapLength;
		const yourButtToOther = (myLength === 0) ?
			buttToCapLength - ((capToButtLength + myLength - buttToButtLength) ** 2 / (4 * myLength)) :
			buttToCapLength;

		return Math.min(myCapToOther, myButtToOther, yourCapToOther, yourButtToOther) < (this.radius + other.radius) ** 2;
	}
	tick(ticker) {
		const delta = this.parent.velocity.copy();
		delta.multiply(ticker.deltaMS / 1000);
		this.manager.moveCollider(this, delta);
	}
}