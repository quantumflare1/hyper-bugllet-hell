import Vec2 from "../math/vec2.mjs";

const keys = new Set();
const mouse = {
	position: new Vec2(0, 0),
	move: new Vec2(0, 0),
	pressed: 0
};

addEventListener("keydown", keydown);
addEventListener("keyup", keyup);
addEventListener("mousemove", mousemove);
addEventListener("mousedown", mousedown);
addEventListener("mouseup", mousedown); // they do the same thing!!!

function keydown(e) {
	if (!e.repeat) {
		keys.add(e.code);
	}
}

function keyup(e) {
	keys.delete(e.code);
}

function mousedown(e) {
	mouse.pressed = e.buttons;
}

function mousemove(e) {
	mouse.position.x = e.clientX; // relative to the whole screen rn
	mouse.position.y = e.clientY;
	mouse.move.x = e.movementX;
	mouse.move.y = e.movementY;
}

export { keys, mouse };