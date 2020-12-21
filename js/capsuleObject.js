// draw capsule (in body)
class capsuleObject {
    // var
    x = 0;
    y = 0;
    angle = 0;
    directionRotation = 1;
    capsuleImage = null;

    // init
    constructor(src) {
        // set position
        this.x = random(170) + 80;
        this.y = random(120) + 100;
        this.angle = random(360);
        if (random(2) == 1) this.directionRotation = -1;

        // set img
        this.capsuleImage = new Image();
        this.capsuleImage.src = src;
    }

    // position
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    // draw
    display(frame, time) {
        frame.grotation(this.capsuleImage, this.x, this.y, 50, 50, this.directionRotation * time / 12 + this.angle);
    }

    // draw for main
    display_big(frame, time) {
        let y = -600 + 770 * this.y / 150 - 770;
        frame.grotation(this.capsuleImage, 160, y, 200, 200, this.directionRotation * time / 12 + this.angle);
    }
}