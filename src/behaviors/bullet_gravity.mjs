const GRAVITY = 4; // maybe make this a parameter in the function (store extra data in bullet object)
const MAX_VELOCITY = 160;

function fall() {
	this.velocity.y += GRAVITY;
	if (this.velocity.y > MAX_VELOCITY)
		this.velocity.y = MAX_VELOCITY;
	return 0;
}

export default [fall];