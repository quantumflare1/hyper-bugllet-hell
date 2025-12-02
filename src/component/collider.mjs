import { Ticker } from "pixi.js";
import CollisionManager from "./collision_manager.mjs";
import Position from "./position.mjs";

/**
 * @param {Position} pos 
 * @param {Collider} collider 
 */
function pointToLineDistance(pos, collider) {
	const pos1ToPoint = pos.squaredDistanceTo(collider.pos1);
	const pos2ToPoint = pos.squaredDistanceTo(collider.pos2);
	const pos1ToPos2 = collider.pos1.squaredDistanceTo(collider.pos2);
	
	return pos1ToPoint - ((pos1ToPoint + pos1ToPos2 - pos2ToPoint) / (2 * Math.sqrt(pos1ToPos2))) ** 2;
}

export default class Collider {
	manager;
	radius;
	x1; y1; x2; y2;
	pos1; pos2;
	referencePos;

	/**
	 * @param {CollisionManager} manager 
	 * @param {Ticker} ticker 
	 * @param {number} radius
	 * @param {Position} ref  
	 * @param {number} x1 
	 * @param {number} x2 
	 * @param {number} y1 
	 * @param {number} y2 
	 */
	constructor(manager, ticker, radius, x1, y1, x2, y2, ref, layer = 0, mask = 0) {
		manager.addCollider(this, layer, mask);
		this.manager = manager;
		this.radius = radius;

		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.pos1 = new Position(x1 + ref.x, y1 + ref.y);
		this.pos2 = new Position(x2 + ref.x, y2 + ref.y);
		this.referencePos = ref;

		ticker.add(this.tick.bind(this));
	}
	/**
	 * @param {Collider} other 
	 */
	collidesWith(other) {
		return Math.min(
		pointToLineDistance(this.pos1, other),
		pointToLineDistance(this.pos2, other),
		pointToLineDistance(other.pos1, this),
		pointToLineDistance(other.pos2, this)
		) < this.radius + other.radius;
	}
	/**
	 * @param {Ticker} ticker 
	 */
	tick(ticker) {
		this.pos1.x = this.x1 + this.referencePos.x;
		this.pos1.y = this.y1 + this.referencePos.y;
		this.pos2.x = this.x2 + this.referencePos.x;
		this.pos2.y = this.y2 + this.referencePos.y;
	}
}