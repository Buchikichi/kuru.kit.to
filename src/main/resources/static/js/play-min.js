document.addEventListener("DOMContentLoaded",function(){new PlayPage});var PlayPage=function(){this.canvas=document.querySelector("canvas");this.canvas.width=512;this.canvas.height=448;if(this.gl=this.initWebGL())console.log(this.gl),this.start()};PlayPage.prototype.initWebGL=function(){var a=this.canvas.getContext("webgl")||this.canvas.getContext("experimental-webgl");a&&(a.clearColor(0,0,0,0),a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT));return a};
PlayPage.prototype.start=function(){var a=function(){(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame)(a)};a()};
