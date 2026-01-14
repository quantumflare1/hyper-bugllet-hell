import Node from "./node.mjs";
import { Graphics } from "pixi.js";
import GlobalConstants from "../constant_defs/global_constants.json";
import HitboxDebugNode from "./debug_hitbox.mjs";

export default class ColliderNode extends Node {
	position; range;
	layer;
	radius;
	manager;

	// returns a collidernodelike: doesn't need a parent or manager
	static fromPoint(vec, layer = 0) {
		return {
			position: vec,
			range: 0,
			radius: 0,
			layer: layer
		};
	}

	constructor(parent, manager, range, radius, layer, stage = null) {
		super(parent);
		parent.collider = this;
		this.manager = manager;
		this.position = parent.position;
		this.range = range;
		this.radius = radius;
		this.layer = layer;

		/*if (GlobalConstants.DEBUG && stage) {
			this.addChild(new HitboxDebugNode(this, stage));
		}*/

		manager?.addCollider(this);
	}
	collidesWith(other) {
		// this code scares me because i haven't looked at it since i wrote it and now none of it makes sense to me
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

		const myCapToYou = (yourLength === 0) ?
			capToCapLength - ((capToCapLength + yourLength - capToButtLength) ** 2 / (4 * yourLength)) :
			capToCapLength;
		const myButtToYou = (yourLength === 0) ?
			buttToCapLength - ((buttToCapLength + yourLength - buttToButtLength) ** 2 / (4 * yourLength)) :
			buttToCapLength;
		const yourCapToMe = (myLength === 0) ?
			capToCapLength - ((capToCapLength + myLength - buttToCapLength) ** 2 / (4 * myLength)) :
			capToCapLength;
		const yourButtToMe = (myLength === 0) ?
			buttToCapLength - ((capToButtLength + myLength - buttToButtLength) ** 2 / (4 * myLength)) :
			buttToCapLength;

		return Math.min(myCapToYou, myButtToYou, yourCapToMe, yourButtToMe) < (this.radius + other.radius) ** 2;
	}
	tick(ticker) {
		super.tick(ticker);
		this.manager.moveCollider(this, this.parent.prevPosition);
	}
}