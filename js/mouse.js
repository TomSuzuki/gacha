var mouse = new point();

// add event
function additionMouseEvent(canvas) {
	canvas.addEventListener('mousemove', mouseMove, true);
	canvas.addEventListener('mouseout', mouseMove, true);
	canvas.addEventListener('mousedown', mouseDown, false);
}

// mouse point
function point() {
	this.x = 0;
	this.y = 0;
	this.click = 0;
}

// mouse click
function mouseDown() {
	mouse.click = 2;
}

// click check
function clickcCheck() {
	mouse.click--;
}

// get click
function getClick() {
	if (mouse.click > 0) {
		mouse.click = 0;
		return true;
	}
	return false;
}

// mouse move event
function mouseMove(event) {
	mouse.x = event.offsetX;
	mouse.y = event.offsetY;
}

// in mouse
function inMouse(x, y, w, h) {
	x = CanvasRate * x;
	y = CanvasRate * y;
	w = CanvasRate * w;
	h = CanvasRate * h;
	return (x < mouse.x && x + w >= mouse.x && y < mouse.y && y + h >= mouse.y);
}