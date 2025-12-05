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
		for (const comp in this) {
			delete this[comp];
		}
	}
}