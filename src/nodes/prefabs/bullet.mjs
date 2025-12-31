import Vec2 from "../../math/vec2.mjs";
import { assets } from "../../core/asset_manager.mjs";
import BulletData from "../../data/bullet_data.json" with { type: "json" };
import StateMachine from "../state_machine.mjs";
import Actor from "./actor.mjs";
import SpriteNode from "../sprite.mjs";

export default class Bullet extends Actor {
	alreadyCollided = new Set();

	constructor(parent, position, velocity, id, color = null) {
		const hitbox = {
			range: new Vec2(BulletData[id].hitbox.rangeX, BulletData[id].hitbox.rangeY),
			radius: BulletData[id].hitbox.radius,
			layer: BulletData[id].hitbox.layer
		};
		const sprite = {
			texture: assets.bulletSheet.textures[BulletData[id].sprite],
			anchor: 0.5
		};
		super(parent, position, velocity, BulletData[id].health, hitbox, sprite);

		const fill = {
			texture: assets.bulletSheet.textures[BulletData[id].innerSprite],
			anchor: 0.5
		};
		this.sprite.addChild(new SpriteNode(this.sprite, parent.display, fill.texture, fill.anchor, color));

		const self = this;
		import(`../../behaviors/bullet_${id}.mjs`).then((res) => {
			self.addChild(new StateMachine(self, ...res.default));
		});
	}
	tick(ticker) {
		super.tick(ticker);

		super.move(ticker);
	}
	setColor(tint) {
		this.sprite.sprite.tint = tint;
	}
}