const TO_RADIANS = Math.PI / 180;

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
    capsuleObj = new capsuleObject()[24];

    // init
    constructor(ctx) {
        this.ctx = ctx;
        this.imgCapsule.src = "./img/capsule_1.png";
        this.imgHontai.src = "./img/hontai.png";
        for (var i in this.capsuleObj) {
            this.capsuleObj[i].setImg(this.imgCapsule);
        };
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

    // init
    constructor() {
    }

    // set img
    setImg(img) {
        this.img = img;
    }

    // draw
    draw(time) {
        game.grotation(this.img, 120, 120, 50, 50, time / 12);
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
    //game.gcopy(game.imgHontai, 160, 200, 400, 380);

    // mozi
}
