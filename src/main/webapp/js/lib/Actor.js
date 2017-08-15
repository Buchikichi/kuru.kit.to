class Matter {
	constructor(x, y, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

class Actor extends Matter {
	constructor(x, y, z = 0) {
		super(x, y, z);
	}

	draw(ctx) {
		ctx.translate(this.x, this.y);
	}
}
