const keys = new Set();
const mouse = {
	x: 0,
	y: 0,
	moveX: 0,
	moveY: 0,
	pressed: 0
};

addEventListener("keydown", keydown);
addEventListener("keyup", keyup);
addEventListener("mousemove", mousemove);
addEventListener("mousedown", mousedown);
addEventListener("mouseup", mousedown);

function keydown(e) {
	if (!e.repeat)
		keys.add(e.code);
}

function keyup(e) {
	keys.delete(e.code);
}

function mousedown(e) {
	mouse.pressed = e.buttons;
}

function mousemove(e) {
	mouse.x = e.clientX; // relative to the whole screen rn
	mouse.y = e.clientY;
	mouse.moveX = e.movementX;
	mouse.moveY = e.movementY;
}

export { keys, mouse };