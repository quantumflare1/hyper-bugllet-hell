import Component from "./component.mjs";

export default class Position extends Component {
	static id = "position";

	x; y;

	constructor(x = 0, y = 0) {
		super();
		this.x = x;
		this.y = y;
	}
	/**
	 * @param {Position} other
	 */
	squaredDistanceTo(other) {
		return (this.x - other.x) ** 2 + (this.y - other.y) ** 2;
	}
}