const TO_RADIANS = Math.PI / 180;

// rate
const PAR_DINNER = 100;
const PAR_LIKE = 2;
const PAR_EATING_OUT = 3;

// game setting
class gameSetting {
    fps = 30;
}

// game variable
let game;
class gameVariable {
    flg = 0;
    time = 0;
    animationTime = 0;
    ctx = null;
    dinnerList = null;
    todayDinner = "";
    key = "dinner";
    imgHontai = new Image();
    capsuleObj = new Array();
    imgTodayCapsule = new Image();
    imgBackground = new Image();

    // init
    constructor(ctx, dinnerList) {
        this.ctx = ctx;
        this.dinnerList = dinnerList;

        // hontai
        this.imgHontai.src = "./img/hontai.png";
        this.imgBackground.src = "./img/background.png";

        // add normal
        for (let i = 0; i < 48; i++) this.capsuleObj.push(new capsuleObject("./img/capsule_1.png"));

        // add rare
        for (let i = 0; i < 3; i++) this.capsuleObj.push(new capsuleObject("./img/capsule_2.png"));
        for (let i = 0; i < 4; i++) this.capsuleObj.push(new capsuleObject("./img/capsule_3.png"));

        // random
        let allPoint = PAR_DINNER + PAR_LIKE + PAR_EATING_OUT;
        let rnd = random(allPoint);
        if (rnd <= PAR_DINNER) {
            this.key = "dinner";
            this.imgTodayCapsule = new capsuleObject("./img/capsule_1.png");
        } else if (rnd <= PAR_DINNER + PAR_LIKE) {
            this.key = "like";
            this.imgTodayCapsule = new capsuleObject("./img/capsule_2.png");
        } else {
            this.key = "eating_out";
            this.imgTodayCapsule = new capsuleObject("./img/capsule_3.png");
        }
        this.imgTodayCapsule.setPoint(-999, -999);
        let n = random(Object.keys(this.dinnerList[this.key]).length - 1);
        this.todayDinner = this.dinnerList[this.key][n];
        console.log("今日の夜ごはんは", this.todayDinner, "です。");
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

    // point
    setPoint(x, y) {
        this.x = x;
        this.y = y;
    }

    // draw
    draw(time) {
        game.grotation(this.img, this.x, this.y, 50, 50, time / 12 + this.angle);
    }
}

// start animation
function startAnimation(b) {
    if (!b) return;
    game.flg = 1;
    game.animationTime = game.time;
}

// animation
function animation(time) {
    let y = 250 + 118.0 * easeOutBounce(time / 120);
    game.imgTodayCapsule.setPoint(228, y);
};


// game init
function gameInitialize(ctx, dinnerList) {
    game = new gameVariable(ctx, dinnerList);

    // game start
    gameMain();
}

// game main
function gameMain() {

    // run
    game.time++

    // animation
    if (game.flg == 0) startAnimation(getClick());
    else if (game.flg == 1) animation(game.time - game.animationTime);

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

    // backgroungd img
    game.gcopy(game.imgBackground, 160, 320, 320, 640);

    // capsule
    for (var i in game.capsuleObj) {
        game.capsuleObj[i].draw(game.time);
    }
    game.imgTodayCapsule.draw(game.time / 5);

    // hontai
    game.gcopy(game.imgHontai, 160, 220, 400, 380);

    // mozi
}

// for random
function random(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function easeOutBounce(time) {
    const n1 = 7.5625;
    const d1 = 2.75;
    let x = Math.min(time, 1);

    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
}