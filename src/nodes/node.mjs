export default class Node {
	children;
	parent;

	constructor(parent) {
		this.children = new Set();
		this.parent = parent;
	}
	addChild(node) {
		this.children.add(node);
	}
	removeChild(node) {
		this.children.delete(node);
	}
	tick(ticker) {
		for (const i of this.children) {
			i.tick(ticker);
		}
	}
}