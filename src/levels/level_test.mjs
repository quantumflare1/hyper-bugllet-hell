import { randomIntBetween } from "../math/utils.mjs";
import Vec2 from "../math/vec2.mjs";
import Enemy from "../nodes/prefabs/enemy.mjs";
import GlobalConstants from "../constant_defs/global_constants.json";
import Player from "../nodes/prefabs/player.mjs";

function testWave() {
	if ("interval" in this.state.memories) {
		if (this.state.timePassed - this.state.memories.startTime >= this.state.memories.interval) {
			this.state.memories.startTime = this.state.timePassed;
			//this.enemies.add(new Enemy(this, new Vec2(randomIntBetween(0, GlobalConstants.FIELD_WIDTH), -40), "test"));
			new Enemy(this, new Vec2(randomIntBetween(0, GlobalConstants.FIELD_WIDTH), -40), "test")
		}
		return 0;
	}
	this.state.memories.interval = 2500;
	this.state.memories.startTime = -2500;
	return 0;
}

const player = {
	position: new Vec2(240, 240),
	health: 3
};

export { player };
export default [testWave];