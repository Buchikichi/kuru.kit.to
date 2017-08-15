class Board extends Actor {
	constructor(x, y, z = 0) {
		super(x, y, z);
		this.rad = -Math.SQ;
		this.speed = 0;

		this.img = new Image();
		this.img.addEventListener('load', ()=> {
			this.width = this.img.width;
			this.height = this.img.height;
			this.hW = this.width / 2;
			this.hH = this.height / 2;
		});
		this.img.src = 'img/board.png';
	}

	decay() {
		this.speed *= Board.DECAY;
		if (Math.floor(this.speed * 1000) == 0) {
			this.speed = 0;
		}
	}

	move() {
		if (this.speed == 0) {
			return;
		}
		this.rad += this.speed;
		this.decay();
	}

	draw(ctx) {
		let x = -this.hW - Board.DISTORTION;
		let y = -this.hH;

		super.draw(ctx);
		ctx.rotate(this.rad);
		ctx.drawImage(this.img, x, y);
	}
}
Board.DISTORTION = 6
Board.DECAY = .95;
