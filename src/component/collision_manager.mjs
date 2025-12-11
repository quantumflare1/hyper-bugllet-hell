import { Application } from "pixi.js";
import Collider from "./collider.mjs";
import Scene from "../scene.mjs";

export default class CollisionManager {
	layers = new Map();
	masks = new Map();

	/**
	 * @param {Scene} scene 
	 */
	constructor(scene) {
		scene.app.ticker.add(this.tick.bind(this));
	}
	/**
	 * @param {Collider} collider 
	 */
	addCollider(collider, layer, mask) {
		if (layer in this.layers.keys()) {
			this.layers[layer].add(collider);
		}
		else {
			this.layers[layer] = new Set([collider]);
		}
		if (mask in this.masks.keys()) {
			this.masks[mask].add(collider);
		}
		else {
			this.masks[mask] = new Set([collider]);
		}
	}
	/**
	 * @param {Collider} collider 
	 */
	removeCollider(collider, layer, mask) {
		this.layers[layer]?.delete(collider);
		if (this.layers[layer]?.size === 0) {
			delete this.layers[layer];
		}
		this.masks[mask]?.delete(collider);
		if (this.masks[mask]?.size === 0) {
			delete this.masks[mask];
		}
	}
	/**
	 * @param {Ticker} ticker 
	 */
	tick(ticker) {
		for (let i = 0; i < this.masks.length; i++) {
			for (const collider1 of this.masks.get(i)) {
				for (const collider2 of this.layers.get(i)) {
					if (collider1.collidesWith(collider2)) {
						if (collider1.partner !== collider2) {
							collider1.partnerWith(collider2);
							dispatchEvent(new CustomEvent("game_collision", { detail: { collider1: collider1, collider2: collider2 } }));
						}
					}
					else if (collider1.partner === collider2) {
						collider1.unpartner(collider2);
						dispatchEvent(new CustomEvent("game_decollision", { detail: { collider1: collider1, collider2: collider2 } }));
					}
				}
			}
		}
	}
}