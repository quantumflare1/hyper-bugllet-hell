import KeyInput from "./key_input.mjs";
import Keys from "../constant_defs/key_constants.json" with { type: "json" };
import { Ticker } from "pixi.js";
import PlayerConstants from "../constant_defs/player_constants.json" with { type: "json" };
import TimeConstants from "../constant_defs/time_constants.json" with { type: "json" };
import Component from "./component.mjs";
import Velocity from "./velocity.mjs";
import Timer from "./timer.mjs";

export default class PlayerControl extends Component {
	static id = "playerControl";

	vel;
	input = new KeyInput();

	/**
	 * @param {Velocity} velocity 
	 * @param {Ticker} ticker
	 */
	constructor(velocity, ticker) {
		super();
		this.vel = velocity;
		ticker.add(this.tick.bind(this))
	}
	/**
	 * @param {Ticker} ticker 
	 */
	tick(ticker) {
		if (this.input.poll("ArrowUp") & Keys.pollResponse.KEY_HELD) {
			this.vel.y = -PlayerConstants.BASE_MOVEMENT_SPEED / TimeConstants.MS_PER_SECOND;
		}
		else if (this.input.poll("ArrowDown") & Keys.pollResponse.KEY_HELD) {
			this.vel.y = PlayerConstants.BASE_MOVEMENT_SPEED / TimeConstants.MS_PER_SECOND;
		}
		else {
			this.vel.y = 0;
		}

		if (this.input.poll("ArrowLeft") & Keys.pollResponse.KEY_HELD) {
			this.vel.x = -PlayerConstants.BASE_MOVEMENT_SPEED / TimeConstants.MS_PER_SECOND;
		}
		else if (this.input.poll("ArrowRight") & Keys.pollResponse.KEY_HELD) {
			this.vel.x = PlayerConstants.BASE_MOVEMENT_SPEED / TimeConstants.MS_PER_SECOND;
		}
		else {
			this.vel.x = 0;
		}
	}
	fire() {

	}
}