import Vec2 from "../math/vec2.mjs";

const BASE_Y_VELOCITY = -960;

function forward() {
	if (this.parent.velocity.equals(new Vec2(0, 0))) {
		this.parent.velocity.add(new Vec2(0, BASE_Y_VELOCITY));
	}
	return 0;
}

export default [forward];