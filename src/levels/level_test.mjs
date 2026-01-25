import { randomIntBetween, pickRandom } from "../math/utils.mjs";
import Vec2 from "../math/vec2.mjs";
import Enemy from "../nodes/prefabs/enemy.mjs";
import GlobalConstants from "../constant_defs/global_constants.json";
import Player from "../nodes/prefabs/player.mjs";

function testWave() {
	if ("interval" in this.state.memories) {
		if (this.timer.timePassed >= this.state.memories.interval) {
			this.timer.mark();
			//this.enemies.add(new Enemy(this, new Vec2(randomIntBetween(0, GlobalConstants.FIELD_WIDTH), -40), "test"));
			new Enemy(this, new Vec2(randomIntBetween(0, GlobalConstants.FIELD_WIDTH), -40), "test")
			return 1;
		}
		return 0;
	}
	this.state.memories.interval = 2500;
	this.timer.mark(2500);
	return 0;
}

function mayflyWave() {
	if (!("enemiesSpawned" in this.state.memories)) {
		this.state.memories.enemiesSpawned = 0;
	}
	if (this.timer.timePassed >= this.state.memories.interval) {
		this.state.memories.interval = 80;
		this.timer.mark();
		new Enemy(this, new Vec2(pickRandom(randomIntBetween(-40, -20), GlobalConstants.FIELD_WIDTH + randomIntBetween(20, 40)), pickRandom(40, 50)), "mayfly");
		this.state.memories.enemiesSpawned++;

		if (this.state.memories.enemiesSpawned >= 5) {
			delete this.state.memories.enemiesSpawned;
			this.state.memories.interval = 2500;
			return 0;
		}
	}
	return 1;
}

const player = {
	position: new Vec2(240, 240),
	health: 3
};

export { player };
export default [testWave, mayflyWave];