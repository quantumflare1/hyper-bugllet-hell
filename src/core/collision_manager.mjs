import Vec2 from "../math/vec2.mjs";
import ColliderNode from "../nodes/collider.mjs";

const SUBDIVISIONS_PER_AXIS = 8; // increase this if bullet spam ends up very laggy; increases memory usage

function generateSubareas() {
	const out = [];
	for (let i = 0; i < SUBDIVISIONS_PER_AXIS; i++) {
		out[i] = [];
		for (let j = 0; j < SUBDIVISIONS_PER_AXIS; j++) {
			out[i][j] = new Set();
		}
	}
	return out;
}

export default class CollisionManager {
	subareaDimensions;
	layers = [];

	constructor(fieldDimensions) {
		this.subareaDimensions = fieldDimensions.copy()
		this.subareaDimensions.divide(SUBDIVISIONS_PER_AXIS);
		
		this.layers[0] = generateSubareas();
		this.layers[1] = generateSubareas();
	}
	getColliderSubareas(collider) {
		// probably faster but less accurate AABB test
		const cap = collider.position.copy();
		cap.subtract(collider.range);
		const butt = collider.position.copy();
		butt.add(collider.range);

		const leftmost = Math.min(cap.x, butt.x);
		const rightmost = Math.max(cap.x, butt.x);
		const topmost = Math.min(cap.y, butt.y);
		const bottommost = Math.max(cap.y, butt.y);
		const left = Math.trunc((leftmost - collider.radius) / this.subareaDimensions.x);
		const right = Math.trunc((rightmost + collider.radius) / this.subareaDimensions.x);
		const top = Math.trunc((topmost - collider.radius) / this.subareaDimensions.x);
		const bottom = Math.trunc((bottommost + collider.radius) / this.subareaDimensions.x);

		if (left < 0 || right >= SUBDIVISIONS_PER_AXIS || top < 0 || bottom >= SUBDIVISIONS_PER_AXIS) return null;
		return {
			left: left,
			right: right,
			top: top,
			bottom: bottom
		};
	}
	addCollider(collider) {
		const subareas = this.getColliderSubareas(collider);

		if (subareas) {
			this.layers[collider.layer][subareas.left][subareas.top].add(collider);
			this.layers[collider.layer][subareas.right][subareas.top].add(collider);
			this.layers[collider.layer][subareas.left][subareas.bottom].add(collider);
			this.layers[collider.layer][subareas.right][subareas.bottom].add(collider);
		}
	}
	removeCollider(collider) {
		const subareas = this.getColliderSubareas(collider);

		if (subareas) {
			this.layers[collider.layer][subareas.left][subareas.top].delete(collider);
			this.layers[collider.layer][subareas.right][subareas.top].delete(collider);
			this.layers[collider.layer][subareas.left][subareas.bottom].delete(collider);
			this.layers[collider.layer][subareas.right][subareas.bottom].delete(collider);
		}
	}
	moveCollider(collider, prevPosition) {
		// this probably is not that efficient but we ball
		//console.log(prevPosition)
		const oldSubareas = this.getColliderSubareas({ position: prevPosition, range: collider.range, radius: collider.radius, layer: collider.layer });

		const subareas = this.getColliderSubareas(collider);

		// REMOVE from old subareas
		if (oldSubareas) {
			if (oldSubareas.bottom !== oldSubareas.top) {
				if (oldSubareas.left !== oldSubareas.right) {
					this.layers[collider.layer][oldSubareas.left][oldSubareas.top].delete(collider);
					this.layers[collider.layer][oldSubareas.left][oldSubareas.bottom].delete(collider);
					this.layers[collider.layer][oldSubareas.right][oldSubareas.top].delete(collider);
					this.layers[collider.layer][oldSubareas.right][oldSubareas.bottom].delete(collider);
				}
				else {
					this.layers[collider.layer][oldSubareas.left][oldSubareas.top].delete(collider);
					this.layers[collider.layer][oldSubareas.left][oldSubareas.bottom].delete(collider);
				}
			}
			else {
				if (oldSubareas.left !== oldSubareas.right) {
					this.layers[collider.layer][oldSubareas.left][oldSubareas.top].delete(collider);
					this.layers[collider.layer][oldSubareas.right][oldSubareas.top].delete(collider);
				}
				else {
					this.layers[collider.layer][oldSubareas.left][oldSubareas.top].delete(collider);
				}
			}
		}
		// ADD to new subareas
		if (subareas) {
			if (subareas.bottom !== subareas.top) {
				if (subareas.left !== subareas.right) {
					this.layers[collider.layer][subareas.left][subareas.top].add(collider);
					this.layers[collider.layer][subareas.left][subareas.bottom].add(collider);
					this.layers[collider.layer][subareas.right][subareas.top].add(collider);
					this.layers[collider.layer][subareas.right][subareas.bottom].add(collider);
				}
				else {
					this.layers[collider.layer][subareas.left][subareas.top].add(collider);
					this.layers[collider.layer][subareas.left][subareas.bottom].add(collider);
				}
			}
			else {
				if (subareas.left !== subareas.right) {
					this.layers[collider.layer][subareas.left][subareas.top].add(collider);
					this.layers[collider.layer][subareas.right][subareas.top].add(collider);
				}
				else {
					this.layers[collider.layer][subareas.left][subareas.top].add(collider);
				}
			}
		}
	}
}