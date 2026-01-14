import Vec2 from "../math/vec2.mjs";

const keys = new Set();
let canvasOffset;
let canvasScale;
const mouse = {
	position: new Vec2(0, 0),
	move: new Vec2(0, 0),
	pressed: 0
};

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

// doesn't compensate for canvas scaling
function mousemove(e) {
	mouse.position.x = (e.clientX - canvasOffset.x) * canvasScale;
	mouse.position.y = (e.clientY - canvasOffset.y) * canvasScale;
	mouse.move.x = e.movementX * canvasScale;
	mouse.move.y = e.movementY * canvasScale;
}

function init() {
	const canvas = document.querySelector("canvas");
	const offset = canvas.getBoundingClientRect();
	canvasScale = canvas.width / canvas.offsetWidth;
	canvasOffset = {
		x: offset.x,
		y: offset.y
	};

	addEventListener("keydown", keydown);
	addEventListener("keyup", keyup);
	addEventListener("mousemove", mousemove);
	addEventListener("mousedown", mousedown);
	addEventListener("mouseup", mousedown); // they do the same thing!!!
}

export { keys, mouse, init };