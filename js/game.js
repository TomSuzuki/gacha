// setting
const TO_RADIANS = Math.PI / 180;
const GAME_FPS = 1000 / 60;

// rate
const PAR_DINNER = 160;
const PAR_LIKE = 2;
const PAR_EATING_OUT = 3;

// file path
const FILE_BODY = "./img/hontai.png";
const FILE_BACKGROUND = "./img/background.png";
const FILE_CAPSUEL_DINNER = "./img/capsule_1.png";
const FILE_CAPSUEL_LIKE = "./img/capsule_2.png";
const FILE_CAPSUEL_EATING_OUT = "./img/capsule_3.png";

// other
var CanvasRate = 1.0;
var Game;

// game variable
class gameVariable {
    // var
    ctx = null;
    isClicked = false;
    isDialogOpen = false;
    time = 0;
    timeOfClicked = 0;
    todayDinnerName = "";
    todayDinnerType = "dinner";
    capsuleObjects = [];
    imgBody = new Image();
    imgTodayCapsule = new Image();
    imgBackground = new Image();
    dialogOpacity = 0;
    dinnerList = null;

    // init
    constructor(ctx, dinnerList) {
        // ctx
        this.ctx = ctx;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        // body
        this.imgBody.src = FILE_BODY;
        this.imgBackground.src = FILE_BACKGROUND;

        // add capsule
        this.capsuleObjects = [];
        for (let i = 0; i < 72; i++) this.capsuleObjects.push(new capsuleObject(FILE_CAPSUEL_DINNER));
        for (let i = 0; i < 3; i++) this.capsuleObjects.push(new capsuleObject(FILE_CAPSUEL_LIKE));
        for (let i = 0; i < 4; i++) this.capsuleObjects.push(new capsuleObject(FILE_CAPSUEL_EATING_OUT));

        // init
        this.dinnerList = dinnerList;
        this.init();
    }

    init() {
        // init event
        this.isClicked = false;
        this.isDialogOpen = false;
        this.dialogOpacity = 0;

        // random
        let allPoint = PAR_DINNER + PAR_LIKE + PAR_EATING_OUT;
        let rnd = random(allPoint);
        if (rnd <= PAR_DINNER) {
            this.todayDinnerType = "dinner";
            this.imgTodayCapsule = new capsuleObject(FILE_CAPSUEL_DINNER);
        } else if (rnd <= PAR_DINNER + PAR_LIKE) {
            this.todayDinnerType = "like";
            this.imgTodayCapsule = new capsuleObject(FILE_CAPSUEL_LIKE);
        } else {
            this.todayDinnerType = "eating_out";
            this.imgTodayCapsule = new capsuleObject(FILE_CAPSUEL_EATING_OUT);
        }
        let n = random(Object.keys(this.dinnerList[this.todayDinnerType]).length);
        this.todayDinnerName = this.dinnerList[this.todayDinnerType][n];
        this.imgTodayCapsule.setPosition(-999, -999);
    }

    // img copy ...center
    gcopy(img, x, y, w, h) {
        x = CanvasRate * x;
        y = CanvasRate * y;
        w = CanvasRate * w;
        h = CanvasRate * h;
        this.ctx.drawImage(img, x - w / 2, y - h / 2, w, h)
    }

    // img rotation
    grotation(img, x, y, w, h, angle) {
        x = CanvasRate * x;
        y = CanvasRate * y;
        w = CanvasRate * w;
        h = CanvasRate * h;
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle * TO_RADIANS);
        this.ctx.drawImage(img, - (w / 2), - (h / 2), w, h);
        this.ctx.restore();
    }

    // rect
    rect(x, y, w, h) {
        x = CanvasRate * x;
        y = CanvasRate * y;
        w = CanvasRate * w;
        h = CanvasRate * h;
        this.ctx.fillRect(x, y, w, h);
    }

    // text
    text(s, x, y, w, h) {
        x = CanvasRate * x;
        y = CanvasRate * y;
        w = CanvasRate * w;
        h = CanvasRate * h;
        this.ctx.fillText(s, x, y, w, h);
    }

    // display
    display() {
        // background
        this.ctx.beginPath();
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(CanvasRate * 0, CanvasRate * 0, CanvasRate * 320, CanvasRate * 640);

        // backgroungd img
        this.gcopy(this.imgBackground, 160, 320, 320, 640);

        // capsule
        for (var i in this.capsuleObjects) {
            this.capsuleObjects[i].display(this, this.time);
        }

        // drop mini capsule
        this.imgTodayCapsule.display(this, this.time);

        // body
        this.gcopy(this.imgBody, 160, 220, 400, 380);

        // big capsule
        this.imgTodayCapsule.display_big(this, this.time);

        // dialog
        if (this.isDialogOpen) {
            // set position
            let alpha = this.dialogOpacity / 255;
            let top_result = 100;
            let top_reload = 350;
            let top_tweet = 450;

            // shadow
            this.ctx.fillStyle = `rgba(0, 0, 0, ${0.75 * alpha})`;
            this.rect(0, 0, 320, 640);

            // result dialog
            this.ctx.fillStyle = `rgba(100, 149, 237, ${alpha})`;
            this.rect(35, top_result - 5, 250, 170);
            this.ctx.fillStyle = `rgba(238, 238, 238, ${alpha})`;
            this.rect(40, top_result, 240, 160);
            this.ctx.fillStyle = `rgba(17, 2, 0, ${alpha})`;
            this.ctx.font = `${CanvasRate * 32}px sans-serif`;
            this.text("今日の夜ごはんは", 160, top_result + 40, 200);
            this.ctx.font = `${CanvasRate * 64}px sans-serif`;
            this.text(this.todayDinnerName, 160, top_result + 107, 200);

            // reload
            if (this.button("もう一度", "CC0000", 50, top_reload, 220, 80, alpha)) {
                this.init();
            };

            // tweet
            if (this.button("ツイート", "1DA1F3", 50, top_tweet, 220, 80, alpha)) {
                this.tweet();
            };

        }

        // start message
        if (!this.isClicked) {
            let y = 470;
            this.ctx.font = `bold ${CanvasRate * 64}px sans-serif`;
            this.ctx.fillStyle = `rgba(0, 70, 70, 1)`;
            this.text("タップでガチャ！", 160 + 3, y + 3, 260);
            this.ctx.fillStyle = `rgba(255, 255, 255, 1)`;
            this.text("タップでガチャ！", 160, y, 260);

        }
    }

    // time
    addTime() {
        this.time++;
    }

    // drop capsule animation
    dropCapsuleAnimation() {
        // set time
        let animationTime = this.time - this.timeOfClicked;

        // img position
        let y = (250 + 118.0 * easeOutBounce(animationTime / 60));
        this.imgTodayCapsule.setPosition(228, y);

        // for dialog
        if (animationTime > 80) {
            this.isDialogOpen = true;
            this.dialogOpacity += 12;
            if (this.dialogOpacity > 255) this.dialogOpacity = 255;
        }
    }

    // start animation
    dropCapsuleStart(bool) {
        if (!bool) return;

        // click!
        this.isClicked = true;
        this.timeOfClicked = this.time;
    }


    // drop capsule
    dropCapsule() {
        if (!this.isClicked) this.dropCapsuleStart(getClick());
        else this.dropCapsuleAnimation();
    }

    // tweet
    tweet() {
        window.open(`http://twitter.com/share?text=今日の夜ごはんは ${this.todayDinnerName} です。 &url=https://tomsuzuki.github.io/gacha/ &hashtags=夜ごはんガチャ`);
    }

    // button
    button(text, col, x, y, w, h, alpha) {
        // init
        let bool = false;
        let rgb = hex2rgb(col);

        // background
        this.ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        this.rect(x, y, w, h);

        // mosue hover
        if (inMouse(x, y, w, h)) {
            alpha = 0.6 * alpha;
            if (getClick()) bool = true;
        }

        // display
        this.ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
        this.rect(x, y, w, h);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        this.ctx.font = `${CanvasRate * 48}px sans-serif`;
        this.text(text, x + w / 2, y + h / 2, w, h);

        return bool;
    }

    main() {
        // run
        this.addTime();

        // drop capsule animation
        this.dropCapsule();

        // draw
        this.display();
    }

}

// game init
function gameInitialize(ctx, dinnerList, canvasRate) {
    // init
    CanvasRate = canvasRate;
    Game = new gameVariable(ctx, dinnerList);

    // game start
    (function () {
        // click
        clickcCheck();

        // main
        Game.main();

        // loop
        setTimeout(arguments.callee, GAME_FPS);
    }());
}

