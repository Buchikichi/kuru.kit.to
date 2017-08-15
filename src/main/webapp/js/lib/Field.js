class Field {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.view = new FlexibleView(width, height);
		this.init();
		Field.Instance = this;
	}

	get ctx() {
		return this.view.ctx;
	}

	init() {
		this.actors = [];
		this.hW = this.width / 2;
		this.hH = this.height / 2;
		this.bg = new Board(this.hW, this.hH);
		this.prev = null;
this.actors.push(this.bg);
		new Controller();
	}

	move() {
		let ctrl = Controller.Instance;
		let pt = ctrl.point;

		this.pt = pt;
		if (ctrl.move.length == 0) {
			this.prev = null;
			return;
		}
		if (this.prev != null && 0 < ctrl.point.length) {
			let prev = this.prev;
			let next = ctrl.point[0];
			let px = prev.x - this.hW;
			let py = prev.y - this.hH;
			let nx = next.x - this.hW;
			let ny = next.y - this.hH;

			this.bg.speed = Math.atan2(ny, nx) - Math.atan2(py, px);
		}
		this.prev = ctrl.point[0];
		this.actors.forEach(actor => {
			actor.move();
		});
	}

	drawDebug() {
		if (this.pt.length == 0) {
			return;
		}
		let ctx = this.ctx;
		let pt = this.pt[0];
		let x = pt.x - this.hW;
		let y = pt.y - this.hH;

		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(x, y);
		ctx.stroke();
	}

	draw() {
		let ctx = this.ctx;

		this.view.clear();
		this.actors.forEach(actor => {
			ctx.save();
			actor.draw(ctx);
			ctx.restore();
		});
		ctx.save();
		ctx.translate(this.hW, this.hH);

		ctx.beginPath();
		ctx.arc(0, 0, 20, 0, Math.PI2, false);
		ctx.strokeStyle = 'rgba(0, 0, 0, .2)';
		ctx.stroke();
		this.drawDebug();
		ctx.restore();
	}
}
