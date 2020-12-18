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
	let ctx = screenCanvas.getContext('2d');
	loadTextFile("./data/dinner.json", function (result) {
		json = JSON.parse(result);
		gameInitialize(ctx, json);
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
	console.log(mouse.x, mouse.y);
	mouse.click = true;
}

// get click
function getClick() {
	let b = mouse.click;
	mouse.click = false;
	return b;
}