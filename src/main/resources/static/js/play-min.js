var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if("prototype"!=d)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;
$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};
$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};
$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6","es3");
var Matter=function(a,b,c){this.x=a;this.y=b;this.z=void 0===c?0:c},Actor=function(a,b,c){Matter.call(this,a,b,void 0===c?0:c)};$jscomp.inherits(Actor,Matter);Actor.prototype.draw=function(a){a.translate(this.x,this.y)};var Board=function(a,b,c){Actor.call(this,a,b,void 0===c?0:c);var d=this;this.rad=-Math.SQ;this.speed=0;this.img=new Image;this.img.addEventListener("load",function(){d.width=d.img.width;d.height=d.img.height;d.hW=d.width/2;d.hH=d.height/2});this.img.src="img/board.png"};
$jscomp.inherits(Board,Actor);Board.prototype.decay=function(){this.speed*=Board.DECAY;0==Math.floor(1E3*this.speed)&&(this.speed=0)};Board.prototype.move=function(){0!=this.speed&&(this.rad+=this.speed,this.decay())};Board.prototype.draw=function(a){var b=-this.hW-Board.DISTORTION,c=-this.hH;Actor.prototype.draw.call(this,a);a.rotate(this.rad);a.drawImage(this.img,b,c)};Board.DISTORTION=6;Board.DECAY=.95;var Controller=function(a){this.init(void 0===a?!1:a);Controller.Instance=this};
Controller.prototype.init=function(a){var b=this;this.mouseMoving=this._contextmenu=!1;a||window.addEventListener("contextmenu",function(a){b.mouseMoving||(b._contextmenu=!0);a.preventDefault()});this.initKeys();this.initPointingDevice()};Controller.prototype.initKeys=function(){var a=this;this.keys={};window.addEventListener("keydown",function(b){b.key?a.keys[b.key]=!0:a.keys["k"+b.keyCode]=!0});window.addEventListener("keyup",function(b){b.key?delete a.keys[b.key]:delete a.keys["k"+b.keyCode]})};
Controller.prototype.initPointingDevice=function(){var a=this,b=document.getElementById("canvas"),c=!1,d=function(){a.point=[];a.prev=[];a.move=[];c=!1};d();b.addEventListener("mousedown",function(b){a.point=[FlexibleView.Instance.convert(b.clientX,b.clientY)];a.prev=a.point;a.move=a.point});b.addEventListener("mousemove",function(b){b=[FlexibleView.Instance.convert(b.clientX,b.clientY)];a.move=b;0<a.prev.length&&(a.point=b);c=!1});b.addEventListener("mouseup",function(){return d()});b.addEventListener("mouseleave",
function(){return d()});b.addEventListener("touchstart",function(b){Array.prototype.forEach.call(b.touches,function(b){a.point.push(FlexibleView.Instance.convert(b.pageX,b.pageY))});a.prev=a.point;a.move=a.point;c=!0;setTimeout(function(){c&&(a._contextmenu=!0)},2E3);b.preventDefault()});b.addEventListener("touchmove",function(b){var d=[];Array.prototype.forEach.call(b.touches,function(a){d.push(FlexibleView.Instance.convert(a.pageX,a.pageY))});a.move=d;0<a.prev.length&&(a.point=d);c=!1});b.addEventListener("touchend",
function(){return d()})};$jscomp.global.Object.defineProperties(Controller.prototype,{delta:{configurable:!0,enumerable:!0,get:function(){var a=this,b=[];this.mouseMoving=!1;this.point.forEach(function(c,d){var e=c.x-a.prev[d].x,f=c.y-a.prev[d].y;b.push({x:e,y:f});a.prev[d]=c;if(0!=e||0!=f)a.mouseMoving=!0});return b}},contextmenu:{configurable:!0,enumerable:!0,get:function(){var a=this._contextmenu;this._contextmenu=!1;return a}}});
var Field=function(a,b){this.width=a;this.height=b;this.view=new FlexibleView(a,b);this.init();Field.Instance=this};Field.prototype.init=function(){this.actors=[];this.hW=this.width/2;this.hH=this.height/2;this.bg=new Board(this.hW,this.hH);this.prev=null;this.actors.push(this.bg);new Controller};
Field.prototype.move=function(){var a=Controller.Instance;this.pt=a.point;if(0==a.move.length)this.prev=null;else{if(null!=this.prev&&0<a.point.length){var b=this.prev,c=a.point[0];this.bg.speed=Math.atan2(c.y-this.hH,c.x-this.hW)-Math.atan2(b.y-this.hH,b.x-this.hW)}this.prev=a.point[0];this.actors.forEach(function(a){a.move()})}};Field.prototype.drawDebug=function(){if(0!=this.pt.length){var a=this.ctx,b=this.pt[0],c=b.x-this.hW;b=b.y-this.hH;a.beginPath();a.moveTo(0,0);a.lineTo(c,b);a.stroke()}};
Field.prototype.draw=function(){var a=this.ctx;this.view.clear();this.actors.forEach(function(b){a.save();b.draw(a);a.restore()});a.save();a.translate(this.hW,this.hH);a.beginPath();a.arc(0,0,20,0,Math.PI2,!1);a.strokeStyle="rgba(0, 0, 0, .2)";a.stroke();this.drawDebug();a.restore()};$jscomp.global.Object.defineProperties(Field.prototype,{ctx:{configurable:!0,enumerable:!0,get:function(){return this.view.ctx}}});
var FlexibleView=function(a,b){this.view=document.getElementById("view");this.canvas=document.getElementById("canvas");this.ctx=this.canvas.getContext("2d");this.scale=1;this.init();this.setSize(a,b);FlexibleView.Instance=this};FlexibleView.prototype.setSize=function(a,b){this.width=a;this.height=b;this.canvas.width=a;this.canvas.height=b;this.resize()};
FlexibleView.prototype.init=function(){var a=this,b=document.querySelector('[data-role="header"]'),c=document.querySelector('[data-role="footer"]');this.headerHeight=b?b.offsetHeight:0;this.footerHeight=c?c.offsetHeight:0;this.margin=this.headerHeight+this.footerHeight;window.addEventListener("resize",function(){a.resize()});window.addEventListener("keydown",function(){a.view.classList.contains("addicting")||a.view.classList.add("addicting")});window.addEventListener("mousemove",function(){a.view.classList.remove("addicting")})};
FlexibleView.prototype.resize=function(){var a=document.body.clientWidth/this.width,b=(window.innerHeight-this.margin)/this.height;this.scale=b<a?b:a;this.view.setAttribute("style",["width:"+this.width+"px","height:"+this.height+"px","transform: scale("+this.scale+")"].join(";"))};FlexibleView.prototype.convert=function(a,b){return{x:a/this.scale,y:(b-this.headerHeight)/this.scale}};FlexibleView.prototype.clear=function(){this.ctx.clearRect(0,0,this.width,this.height)};Math.PI2=Math.PI2||2*Math.PI;
Math.SQ=Math.SQ||Math.PI/2;Math.trim=Math.trim||function(a){for(;Math.PI<a;)a-=Math.PI2;for(;a<-Math.PI;)a+=Math.PI2;return a};Math.close=Math.close||function(a,b,c){b=Math.trim(a-b);return Math.abs(b)<=c?a:0<b?a-c:a+c};document.addEventListener("DOMContentLoaded",function(){new PlayPage});var PlayPage=function(){this.field=new Field(1024,768);this.start()};
PlayPage.prototype.initWebGL=function(){var a=this.canvas.getContext("webgl")||this.canvas.getContext("experimental-webgl");a&&(a.clearColor(0,0,0,0),a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT));return a};PlayPage.prototype.start=function(){var a=this,b=function(){var c=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;a.field.move();a.field.draw();c(b)};b()};
