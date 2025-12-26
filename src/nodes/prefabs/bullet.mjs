import Vec2 from "../../math/vec2.mjs";
import { assets } from "../../core/asset_manager.mjs";
import BulletData from "../../data/bullet_data.json" with { type: "json" };
import StateMachine from "../state_machine.mjs";
import GlobalConstants from "../../constant_defs/global_constants.json";
import Actor from "./actor.mjs";

export default class Bullet extends Actor {
	alreadyCollided = new Set();

	constructor(parent, position, id) {
		const hitbox = {
			range: new Vec2(BulletData[id].hitbox.rangeX, BulletData[id].hitbox.rangeY),
			radius: BulletData[id].hitbox.radius,
			layer: BulletData[id].hitbox.layer
		};
		const sprite = {
			texture: assets.bulletSheet.textures[BulletData[id].sprite],
			anchor: 0.5
		};
		super(parent, position, BulletData[id].health, hitbox, sprite);

		const self = this;
		import(`../../behaviors/${id}.mjs`).then((res) => {
			self.addChild(new StateMachine(self, ...res.default));
		});
	}
	tick(ticker) {
		super.tick(ticker);

		super.move(ticker);

		if (this.position.x < -GlobalConstants.FIELD_WIDTH || this.position.x > GlobalConstants.FIELD_WIDTH * 2 || this.position.y < -GlobalConstants.FIELD_HEIGHT || this.position.y > GlobalConstants.FIELD_HEIGHT * 2) {
			this.parent.removeChild(this);
			this.sprite.destroy();
		}
	}
}