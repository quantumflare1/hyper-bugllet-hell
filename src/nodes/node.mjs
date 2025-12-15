export default class Node {
	children = new WeakSet();
	parent;

	constructor(parent) {
		this.parent = parent;
	}
	addChild(node) {
		this.children.add(node);
	}
	removeChild(node) {
		this.children.delete(node);
	}
	tick() {}
}