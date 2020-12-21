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
    dialog = false;
    dialogOpacity = 0;

    // init
    constructor(ctx, dinnerList) {
        this.ctx = ctx;
        this.dinnerList = dinnerList;

        // hontai
        this.imgHontai.src = "./img/hontai.png";
        this.imgBackground.src = "./img/background.png";

        // add normal
        for (let i = 0; i < 72; i++) this.capsuleObj.push(new capsuleObject("./img/capsule_1.png"));

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
        let n = random(Object.keys(this.dinnerList[this.key]).length);
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
    directionRotation = 1;

    // init
    constructor(src) {
        this.x = random(170) + 80;
        this.y = random(120) + 100;
        this.angle = random(360);
        if (random(2) == 1) this.directionRotation = -1;

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
        game.grotation(this.img, CanvasRate * this.x, CanvasRate * this.y, CanvasRate * 50, CanvasRate * 50, this.directionRotation * time / 12 + this.angle);
    }

    // draw for main
    drawF(time) {
        let y = -600 + 770 * this.y / 150 - 770;
        game.grotation(this.img, CanvasRate * 160, CanvasRate * y, CanvasRate * 200, CanvasRate * 200, this.directionRotation * time / 12 + this.angle);
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
    let y = (250 + 118.0 * easeOutBounce(time / 160));
    game.imgTodayCapsule.setPoint(228, y);

    if (time > 270) {
        game.dialog = true;
        game.dialogOpacity += 12;
        if (game.dialogOpacity > 255) game.dialogOpacity = 255;
    }
};


// game init
var CanvasRate = 0;
function gameInitialize(ctx, dinnerList, canvasRate) {
    game = new gameVariable(ctx, dinnerList);
    CanvasRate = canvasRate;

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
    game.ctx.fillRect(CanvasRate * 0, CanvasRate * 0, CanvasRate * 320, CanvasRate * 640);

    // backgroungd img
    game.gcopy(game.imgBackground, CanvasRate * 160, CanvasRate * 320, CanvasRate * 320, CanvasRate * 640);

    // capsule
    for (var i in game.capsuleObj) {
        game.capsuleObj[i].draw(game.time);
    }
    game.imgTodayCapsule.draw(game.time / 5);

    // hontai
    game.gcopy(game.imgHontai, CanvasRate * 160, CanvasRate * 220, CanvasRate * 400, CanvasRate * 380);

    // before capsule
    game.imgTodayCapsule.drawF(game.time / 5);

    // mozi
    if (game.dialog) {
        let alpha = game.dialogOpacity / 255;
        let top_result = 100;
        let top_reload = 350;
        let top_tweet = 450;

        // shadow
        game.ctx.fillStyle = `rgba(0, 0, 0, ${0.75 * alpha})`;
        game.ctx.fillRect(CanvasRate * 0, CanvasRate * 0, CanvasRate * 320, CanvasRate * 640);

        // result dialog
        game.ctx.fillStyle = `rgba(100, 149, 237, ${alpha})`;
        game.ctx.fillRect(CanvasRate * 35, CanvasRate * (top_result - 5), CanvasRate * 250, CanvasRate * 170);
        game.ctx.fillStyle = `rgba(238, 238, 238, ${alpha})`;
        game.ctx.fillRect(CanvasRate * 40, CanvasRate * top_result, CanvasRate * 240, CanvasRate * 160);
        game.ctx.fillStyle = `rgba(17, 2, 0, ${alpha})`;
        game.ctx.textAlign = "center";
        game.ctx.textBaseline = "top";
        game.ctx.font = `${CanvasRate * 32}px sans-serif`;
        game.ctx.fillText("今日の夜ごはんは", CanvasRate * 160, CanvasRate * (top_result + 25), CanvasRate * 200);
        game.ctx.font = `${CanvasRate * 64}px sans-serif`;
        game.ctx.fillText(game.todayDinner, CanvasRate * 160, CanvasRate * (top_result + 75), CanvasRate * 200);

        // reload
        game.ctx.fillStyle = `rgba(205, 51, 51, ${alpha})`;
        if (button(CanvasRate * 50, CanvasRate * top_reload, CanvasRate * 220, CanvasRate * 80)) {
            console.log("aa");
            game.ctx.fillStyle = `rgba(139, 35, 35, ${alpha})`;
            if (getClick()) {
                location.reload();
            }
        }
        game.ctx.fillRect(CanvasRate * 50, CanvasRate * top_reload, CanvasRate * 220, CanvasRate * 80);
        game.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        game.ctx.font = `${CanvasRate * 48}px sans-serif`;
        game.ctx.fillText("もう一度", CanvasRate * 160, CanvasRate * (top_reload + 18), CanvasRate * 220, CanvasRate * 80);

        // tweet
        game.ctx.fillStyle = `rgba(135, 206, 255, ${alpha})`;
        if (button(CanvasRate * 50, CanvasRate * top_tweet, CanvasRate * 220, CanvasRate * 80)) {
            console.log("aa");
            game.ctx.fillStyle = `rgba(108, 166, 205, ${alpha})`;
            if (getClick()) {
                window.open(`http://twitter.com/share?text=今日の夜ごはんは ${game.todayDinner} です。 &url=https://tomsuzuki.github.io/gacha/ &hashtags=夜ご飯ガチャ`);
            }

        }
        game.ctx.fillRect(CanvasRate * 50, CanvasRate * top_tweet, CanvasRate * 220, CanvasRate * 80);
        game.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        game.ctx.font = `${CanvasRate * 48}px sans-serif`;
        game.ctx.fillText("ツイート", CanvasRate * 160, CanvasRate * (top_tweet + 18), CanvasRate * 220, CanvasRate * 80);

    }
}

// in mouse
function button(x, y, w, h) {
    return (x < mouse.x && x + w >= mouse.x && y < mouse.y && y + h >= mouse.y);
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