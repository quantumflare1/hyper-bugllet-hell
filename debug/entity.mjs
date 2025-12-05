import Collider from "../src/component/collider.mjs";
import Position from "../src/component/position.mjs";
import Velocity from "../src/component/velocity.mjs";
import Entity from "../src/entity.mjs";

const ent = new Entity(new Position(10, 10));
ent.addComponent(new Velocity(5, 5, ent.position), null);

ent.addComponent(new Collider(null, null, 5, 0, -5, 0, 5, ent.position));

console.log(ent.velocity);