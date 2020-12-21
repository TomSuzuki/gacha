var mouse = new point();
var screenCanvas;

// 最初に実行
window.addEventListener('load', function () {
	initialize();
})

// init
function initialize() {
	screenCanvas = document.getElementById('canvas');

	// width and height
	let ph = document.documentElement.clientHeight * 0.85;
	let pw = ph / 2;
	let par = pw / 320;
	screenCanvas.width = pw;
	screenCanvas.height = ph;
	if (pw > document.documentElement.clientWidth * 0.9) {
		pw = document.documentElement.clientWidth * 0.85;
		ph = pw * 2;
		par = pw / 320;
		screenCanvas.width = pw;
		screenCanvas.height = ph;
	}

	// mouse
	screenCanvas.addEventListener('mousemove', mouseMove, true);
	screenCanvas.addEventListener('click', onClick, false);

	// create
	let ctx = screenCanvas.getContext('2d');
	loadTextFile("./data/dinner.json", function (result) {
		json = JSON.parse(result);
		gameInitialize(ctx, json, par);
	});
}

// mouse move event
function mouseMove(event) {
	mouse.x = event.clientX - screenCanvas.offsetLeft + window.pageXOffset;
	mouse.y = event.clientY - screenCanvas.offsetTop + window.pageYOffset;
}

// mouse point
function point() {
	this.x = 0;
	this.y = 0;
	this.click = false;
}

// mouse click
function onClick() {
	mouse.click = true;
}

// get click
function getClick() {
	let b = mouse.click;
	mouse.click = false;
	return b;
}