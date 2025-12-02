import Collider from "../src/component/collider.mjs";
import Position from "../src/component/position.mjs";

const c1 = new Collider(null, null, 6, 0, 0, 0, 0, new Position(200, 200), 0, 1);
const c2 = new Collider(null, null, 30, 20, 20, 20, 20, new Position(200, 200), 1, 0);

console.log("collision:", c1.collidesWith(c2), "; expected True");