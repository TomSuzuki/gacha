// default
const CanvasWidth = 320;
const CanvasHeight = 640;
var screenCanvas;

// 最初に実行
window.addEventListener('load', function () {
	initialize();
})

// init
function initialize() {
	screenCanvas = document.getElementById('canvas');

	// width and height
	resize(screenCanvas);
	window.addEventListener('resize', () => { resize(screenCanvas) });

	// mouse
	additionMouseEvent(screenCanvas);

	// create
	let ctx = screenCanvas.getContext('2d');
	loadTextFile("./data/dinner.json", function (result) {
		json = JSON.parse(result);
		gameInitialize(ctx, json, 1.0);
	});
}

function resize(canvas) {
	// now client size
	let clientH = window.innerHeight;
	let clientW = window.innerWidth;

	// canvas size (max-height)
	let h = clientH;
	let w = clientH / 2;

	// canvas size (max-width)
	if (w > clientW) {
		h = clientW * 2;
		w = clientW;
	}

	// resize
	let p = w / CanvasWidth;
	canvas.style.transform = `translate(-50%, -50%) scale(${p}, ${p})`;
}