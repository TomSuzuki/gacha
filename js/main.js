var mouse = new point();
var screenCanvas;

// 最初に実行
window.addEventListener('load', function () {
	initialize();
})

// init
function initialize() {
	screenCanvas = document.getElementById('canvas');
	screenCanvas.addEventListener('mousemove', mouseMove, true);
	screenCanvas.addEventListener('click', onClick, false);

	// width and height
	let ph = document.documentElement.clientHeight - 100;
	let pw = ph / 2;
	screenCanvas.width = pw;
	screenCanvas.height = ph;
	let par = pw / 320;

	// create
	let ctx = screenCanvas.getContext('2d');
	loadTextFile("./data/dinner.json", function (result) {
		json = JSON.parse(result);
		gameInitialize(ctx, json, par);
	});
}

// mouse move event
function mouseMove(event) {
	mouse.x = event.clientX - screenCanvas.offsetLeft;
	mouse.y = event.clientY - screenCanvas.offsetTop;
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