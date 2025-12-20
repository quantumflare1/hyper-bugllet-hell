import Node from "./node.mjs";

export default class ColliderNode extends Node {
	cap; butt;
	layer;
	radius;

	constructor(parent, cap, butt, radius, layer) {
		super(parent);
		this.cap = cap;
		this.butt = butt;
		this.radius = radius;
		this.layer = layer;
	}
	collidesWith(other) {
		// stupid chud geometry
		const capToCap = other.cap.copy();
		capToCap.subtract(this.cap);
		const capToButt = other.butt.copy();
		capToButt.subtract(this.cap);
		const buttToCap = other.cap.copy();
		buttToCap.subtract(this.butt);
		const buttToButt = other.butt.copy();
		buttToButt.subtract(this.butt);
		const me = this.butt.copy();
		me.subtract(this.cap);
		const you = other.butt.copy();
		you.subtract(other.cap);

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
		this.cap.add(this.parent.velocity);
		this.butt.add(this.parent.velocity);
	}
}