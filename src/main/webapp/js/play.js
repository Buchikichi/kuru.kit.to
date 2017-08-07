document.addEventListener('DOMContentLoaded', ()=> {
	new PlayPage();
});

class PlayPage {
	constructor() {
		this.canvas = document.querySelector('canvas');
		this.canvas.width = 512;
		this.canvas.height = 448;
		this.gl = this.initWebGL();
		if (this.gl) {
console.log(this.gl);
			this.start();
		}
	}

	initWebGL() {
		let gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");

		if (gl) {
			gl.clearColor(0.0, 0.0, 0.0, 0.0);
			// 深度テストを有効化
			gl.enable(gl.DEPTH_TEST);
			// 近くにある物体は、遠くにある物体を覆い隠す
			gl.depthFunc(gl.LEQUAL);
			// カラーバッファや深度バッファをクリアする
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		}
		return gl;
	}

	start() {
		let activate = ()=> {
			let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

//			this.field.move();
//			this.field.draw();
			requestAnimationFrame(activate);
		};

		activate();
	}
}
