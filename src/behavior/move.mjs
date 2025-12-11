import Time from "../constant_defs/time_constants.json" with {type:"json"}
import Behavior from "../constant_defs/behavior_constants.json" with {type: "json"};

const defaults = {
	//vel: 50,
	first: true
};

const move = {
	vel: 50,
	first: true,
	reset() {
		for (const i in defaults) {
			move[i] = defaults[i];
		}
	},
	tick(ticker, parent, memory) {
		if ("targetX" in memory) {
			if (this.first) { // whatever good enough
				const distanceX = memory.targetX - parent.position.x;
				const distanceY = memory.targetY - parent.position.y;
				const hypotenuse = Math.sqrt(distanceX ** 2 + distanceY ** 2); 
				const velX = distanceX / hypotenuse * this.vel;
				const velY = distanceY / hypotenuse * this.vel;
				parent.velocity.x = velX / Time.MS_PER_SECOND;
				parent.velocity.y = velY / Time.MS_PER_SECOND;

				this.first = false;
			}

			if ((parent.position.x - memory.targetX) ** 2 + (parent.position.y - memory.targetY) ** 2 < 1) {
				parent.velocity.x = 0;
				parent.velocity.y = 0;

				delete memory.targetX;
				delete memory.targetY;
				this.reset();
				return Behavior.IDLE;
			}
		}
		return -1;
	}
};

export default move;