import { Ticker, UPDATE_PRIORITY } from "pixi.js";

const keys = new Set();
const pressedKeys = new Set();
const mouse = {
	x: 0,
	y: 0,
	moveX: 0,
	moveY: 0,
	pressed: 0
};

const ticker = new Ticker();
ticker.maxFPS = 60;
ticker.autoStart = true;
ticker.add(resetPress, null, UPDATE_PRIORITY.LOW);

function resetPress(ticker) {
	prevTickKeys.clear();
}

addEventListener("keydown", keydown);
addEventListener("keyup", keyup);
addEventListener("mousemove", mousemove);
addEventListener("mousedown", mousedown);
addEventListener("mouseup", mousedown); // they do the same thing!!!

function keydown(e) {
	if (!e.repeat) {
		keys.add(e.code);
		ticker.addOnce((ticker) => { prevTickKeys.add(e.code); }, null, UPDATE_PRIORITY.HIGH);
	}
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

export { keys, pressedKeys, mouse };