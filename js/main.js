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
	let ctx = screenCanvas.getContext('2d');
	loadTextFile("./data/dinner.json", function (result) {
		json = JSON.parse(result);
		gameInitialize(ctx, json);
	});
}

// mouse move event
function mouseMove(event) {
	mouse.x = event.clientX - screenCanvas.offsetLeft + 320 / 2;
	mouse.y = event.clientY - screenCanvas.offsetTop + 640 / 2;
}

// mouse point
function point() {
	this.x = 0;
	this.y = 0;
}
