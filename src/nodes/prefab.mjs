import Node from "./node.mjs";

export default class Prefab extends Node {
	constructor(parent) {
		super(parent);
		parent.addChild(this);
	}
}