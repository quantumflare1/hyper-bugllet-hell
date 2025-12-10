import { Sprite, Texture } from "pixi.js";
import { assets } from "./asset_manager.mjs";
import Position from "./component/position.mjs";
import Velocity from "./component/velocity.mjs";
import EntitySprite from "./component/sprite.mjs";
import PlayerControl from "./component/player.mjs";
import Scene from "./scene.mjs";
import Collider from "./component/collider.mjs";
import PlayerConstants from "./constant_defs/player_constants.json" with { type:"json" };
import Entity from "./entity.mjs";

export default class Player extends Entity {
	/**
	 * @param {Scene} scene 
	 */
	constructor(scene) {
		const pos = new Position(240, 240);
		const vel = new Velocity(0, 0, pos, scene.app.ticker);
		const con = new PlayerControl(vel, scene.app.ticker);
		const spr = new EntitySprite(assets.player, pos, 0.5, scene.app.stage, scene.app.ticker);
		const col = new Collider(scene.collisionMgr, scene.app.ticker, PlayerConstants.HITBOX_RADIUS, PlayerConstants.HITBOX_OFFSET_X, PlayerConstants.HITBOX_OFFSET_Y, PlayerConstants.HITBOX_OFFSET_X, PlayerConstants.HITBOX_OFFSET_Y, pos, 0, 1);
		super(pos, vel, con, spr, col);

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