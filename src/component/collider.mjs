import Position from "./position.mjs";

/**
 * @param {Position} pos 
 * @param {Collider} collider 
 */
function pointToCapsuleDistance(pos, collider) {
	const pos1ToPoint = pos.squaredDistanceTo(collider.pos1);
	const pos2ToPoint = pos.squaredDistanceTo(collider.pos2);
	const pos1ToPos2 = collider.pos1.squaredDistanceTo(collider.pos2);
	
	return pos1ToPoint - ((pos1ToPoint + pos1ToPos2 - pos2ToPoint) / (2 * Math.sqrt(pos1ToPos2))) ** 2;
}

export default class Collider {
	radius;
	pos1; pos2;
	referencePos;

	/**
	 * @param {number} radius
	 * @param {Position} ref  
	 * @param {number} x1 
	 * @param {number} x2 
	 * @param {number} y1 
	 * @param {number} y2 
	 */
	constructor(radius, x1, y1, x2, y2, ref) {
		this.radius = radius;
		this.pos1 = new Position(x1, y1);
		this.pos2 = new Position(x2, y2);
		this.referencePos = ref;
	}
	/**
	 * @param {Collider} other 
	 */
	collidesWith(other) {
		return Math.min(
		pointToCapsuleDistance(this.pos1, other),
		pointToCapsuleDistance(this.pos2, other),
		pointToCapsuleDistance(other.pos1, this),
		pointToCapsuleDistance(other.pos2, this)
		) < this.radius + other.radius;
	}
}