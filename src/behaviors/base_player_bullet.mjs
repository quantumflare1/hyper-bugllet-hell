import Vec2 from "../math/vec2.mjs";

function forward() {
	if (this.parent.velocity.equals(new Vec2(0, 0))) {
		this.parent.velocity.add(new Vec2(0, -960));
	}
	return 0;
}

export default [forward];