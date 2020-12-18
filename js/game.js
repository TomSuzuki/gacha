const TO_RADIANS = Math.PI / 180;

// rate
const PAR_DINNER = 0.9;
const PAR_LIKE = 0.05;
const PAR_EATING_OUT = 0.07;

// game setting
class gameSetting {
    fps = 30;
}

// game variable
let game;
class gameVariable {
    flg = 0;
    time = 0;
    ctx = null;
    imgHontai = new Image();
    imgCapsule = new Image();
    capsuleObj = new Array();

    // init
    constructor(ctx) {
        this.ctx = ctx;
        this.imgHontai.src = "./img/hontai.png";

        // add normal
        for (let i = 0; i < 48; i++) this.capsuleObj.push(new capsuleObject("./img/capsule_1.png"));

        // add rare
        for (let i = 0; i < 3; i++) this.capsuleObj.push(new capsuleObject("./img/capsule_2.png"));
        for (let i = 0; i < 4; i++) this.capsuleObj.push(new capsuleObject("./img/capsule_3.png"));

    }

    // img copy ...center
    gcopy(img, x, y, w, h) {
        this.ctx.drawImage(img, x - w / 2, y - h / 2, w, h)
    }

    // img rotation
    grotation(img, x, y, w, h, angle) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle * TO_RADIANS);
        this.ctx.drawImage(img, - (w / 2), - (h / 2), w, h);
        this.ctx.restore();
    }

}

// draw capsule (in hontai)
class capsuleObject {
    img = null;
    x = 0;
    y = 0;
    angle = 0;

    // init
    constructor(src) {
        this.x = random(170) + 80;
        this.y = random(120) + 100;
        this.angle = random(360);

        // set img
        this.img = new Image();
        this.img.src = src;
    }

    // draw
    draw(time) {
        game.grotation(this.img, this.x, this.y, 50, 50, time / 12 + this.angle);
    }
}


// game init
function gameInitialize(ctx) {
    game = new gameVariable(ctx);

    // game start
    gameMain();
}

// game main
function gameMain() {

    // run
    game.time++

    // draw
    gameDraw();

    // loop
    setTimeout(arguments.callee, gameSetting.fps);
}

// game draw
function gameDraw() {
    // background
    game.ctx.beginPath();
    game.ctx.fillStyle = "#FFFFFF";
    game.ctx.fillRect(0, 0, 320, 640);

    // capsule
    for (var i in game.capsuleObj) {
        game.capsuleObj[i].draw(game.time);
    }

    // hontai
    game.gcopy(game.imgHontai, 160, 220, 400, 380);

    // mozi
}

// for random
function random(max) {
    return Math.floor(Math.random() * Math.floor(max));
}