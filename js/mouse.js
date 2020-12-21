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