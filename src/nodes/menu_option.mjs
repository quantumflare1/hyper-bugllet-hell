import Node from "./node.mjs";

export default class MenuOption extends Node {
	callback;

	constructor(parent, callback) {
		super(parent);
		this.callback = callback;
	}
}

/*
menu buttons should have:
- sprite
- label
- callback when selected
- collider (for cursor)

menus should have:
- state machine
	- button list tied to state

unrelated but scene transitions:
- should be handled globally (in game script)
- should be written in their own files (like behaviors/states)
*/