class Field {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.view = new FlexibleView(width, height);
		this.init();
		Field.Instance = this;
	}

	init() {
		this.hW = this.width / 2;
		this.hH = this.height / 2;
		new Controller();
	}

	move() {
		let ctrl = Controller.Instance;
		let pt = ctrl.point;
		let delta = ctrl.delta;

		this.pt = pt;
	}

	drawDebug() {
		if (this.pt.length == 0) {
			return;
		}
		let ctx = this.view.ctx;
		let pt = this.pt[0];
		let x = pt.x - this.hW;
		let y = pt.y - this.hH;

		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(x, y);
		ctx.stroke();
	}

	draw() {
		let ctx = this.view.ctx;

		this.view.clear();
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
