import Vec2 from "../math/vec2.mjs";

function moveDown() {
	if (this.velocity.equals(new Vec2(0, 0))) {
		this.velocity.y = 80;
	}
	return 0;
}

export default [moveDown];