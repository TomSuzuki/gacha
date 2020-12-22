// add event
function additionMouseEvent(canvas) {
	canvas.addEventListener('mousemove', mouseMove, true);
	canvas.addEventListener('mouseout', mouseMove, true);
	canvas.addEventListener('mousedown', mouseDown, false);
	canvas.addEventListener('mouseup', mouseUp, false);
}

// mouse point
function point() {
	this.x = 0;
	this.y = 0;
	this.click = false;
}

// mouse click
function mouseDown() {
	mouse.click = true;
}

// mouseup
function mouseUp() {
	mouse.click = false;
}

// get click
function getClick() {
	let b = mouse.click;
	mouse.click = false;
	return b;
}

// mouse move event
function mouseMove(event) {
	mouse.x = event.clientX - screenCanvas.offsetLeft + window.pageXOffset;
	mouse.y = event.clientY - screenCanvas.offsetTop + window.pageYOffset;
}

// in mouse
function inMouse(x, y, w, h) {
	x = CanvasRate * x;
	y = CanvasRate * y;
	w = CanvasRate * w;
	h = CanvasRate * h;
	return (x < mouse.x && x + w >= mouse.x && y < mouse.y && y + h >= mouse.y);
}