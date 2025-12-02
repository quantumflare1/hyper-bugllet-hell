import { Sprite, Texture } from "pixi.js";
import { assets } from "./asset_manager.mjs";
import Position from "./component/position.mjs";
import Velocity from "./component/velocity.mjs";
import EntitySprite from "./component/sprite.mjs";
import PlayerControl from "./component/player.mjs";
import Scene from "./scene.mjs";
import Collider from "./component/collider.mjs";
import PlayerConstants from "./constant_defs/player_constants.json" with { type:"json" };

// TODO: make entity base class (?)
export default class Player {
	position;
	velocity;
	collider;
	control;
	sprite;
	/**
	 * @param {Scene} scene 
	 */
	constructor(scene) {
		this.position = new Position(240, 240);
		this.velocity = new Velocity(0, 0, this.position, scene.app.ticker);
		this.control = new PlayerControl(this, scene.app.ticker);
		this.sprite = new EntitySprite(assets.player, this.position, 0.5, scene.app.stage, scene.app.ticker);
		this.collider = new Collider(scene.collisionMgr, scene.app.ticker, PlayerConstants.HITBOX_RADIUS, PlayerConstants.HITBOX_OFFSET_X, PlayerConstants.HITBOX_OFFSET_Y, PlayerConstants.HITBOX_OFFSET_X, PlayerConstants.HITBOX_OFFSET_Y, this.position, 0, 1);

		addEventListener("game_collision", (e) => {
			if (e.detail.collider1 === this.collider || e.detail.collider2 === this.collider) {
				this.sprite.texture.texture = Texture.from("../assets/player_damage.png")
			}
		});
		addEventListener("game_decollision", (e) => {
			if (e.detail.collider1 === this.collider || e.detail.collider2 === this.collider) {
				this.sprite.texture.texture = Texture.from("../assets/player_temp.png")
			}
		});
	}
}