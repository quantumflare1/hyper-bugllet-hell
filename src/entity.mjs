import Component from "./component/component.mjs";

export default class Entity {
	/**
	 * @param {...Component} components 
	 */
	constructor(...components) {
		for (const comp of components) {
			this[comp.constructor.id] = comp;
		}
	}
	addComponent(component) {
		this[component.constructor.id] = component;
	}
	deleteComponent(component) {
		delete this[component.constructor.id];
	}
	destroy() {
		// todo: i don't think this actually fully deletes components (functions are still referenced by ticker) so fix that
		for (const comp in this) {
			delete this[comp];
		}
	}
}