import CollisionManager from "./component/collision_manager.mjs";
import Player from "./player.mjs";

export default class Level {
	collisionMgr;

	constructor(app) {
		this.collisionMgr = new CollisionManager(app);
	}
	init() {
		const player = new Player();
	}
}