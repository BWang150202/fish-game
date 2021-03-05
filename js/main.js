const can1 = document.querySelector('.canvas1'); //fish,dust,circle
const can2 = document.querySelector('.canvas2'); //bg,fruit,ane
const can0 = document.querySelector('.canvas0');

let ctx1;
let ctx2;
let ctx0;

let canWidth;
let canHeight;

let lastTime;
let deltaTime;

let bgPic = new Image();
let plBe = new Image();

let ane;
let fruit;

let mom;
let baby;

let mx;
let my;

let babyTail = [];
let babyEye = [];
let babyBody = [];

let bigTail = [];
let bigEye = [];
let bigBodyOra = [];
let bigBodyBlue = [];

let data;
let playBegin;
let isPause;
let playing;

let wave;
let halo;

let dust;
let dustPic = []; //存放图片

let x;
let y;

let rx;
let ry;

document.body.onload = game;

function game() {
    console.log('onload')
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

function init() {
    ctx1 = can1.getContext("2d");
    ctx2 = can2.getContext("2d");
    ctx0 = can0.getContext("2d");



    can1.addEventListener('mousemove', onMouseMove, false)


    bgPic.src = './src/background.jpg';
    plBe.src = './src/play.png';

    canWidth = can1.width;
    canHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    data = new dataObj();



    playBegin = false;
    isRefresh = false;
    isPause = false;



    can1.addEventListener('click', (e) => {
        // console.log(e.e.layerX)
        if (e.offSetX || e.layerX) {
            x = e.offSetX == undefined ? e.layerX : e.offSetX;
            y = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
        // p = getEventPosition(e);
        //  console.log(p.x)


        console.log(x, y);

        if (x < 420 && x > 365 && y < 480 && y > 455) {
            // if ((x - 400) * (x - 400) + (y - 400) * (y - 400) <= 40 * 40 * Math.PI) {
            console.log('开始');
            if (!playBegin) {
                playBegin = true;
                playing = true;
                //ctx2.fillRect(360, 360, 80, 80);
            }

        }
        if (isRefresh) {
            if (y > 280 && y < 300 && x > 340 && x < 445) {
                window.location.reload();
            }
        }
        if (!isPause) {
            if (y > 540 && y < 570 && x > 600 && x < 660) {
                //暂停
                isPause = true;
                playing = false;
            }
        } else {
            //继续
            isPause = false;
            playing = true;
        }

    });
    /*can1.onclick = function(e) {

        // console.log(e.e.layerX)
        if (e.offSetX || e.layerX) {
            x = e.offSetX == undefined ? e.layerX : e.offSetX;
            y = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
        // p = getEventPosition(e);
        //  console.log(p.x)


        console.log(x, y);

        if ((x - 400) * (x - 400) + (y - 400) * (y - 400) <= 40 * 40 * Math.PI) {
            console.log('开始');
            if (!playBegin) {
                playBegin = true;
                //ctx2.fillRect(360, 360, 80, 80);
            }

        }
        if (isRefresh) {
            if (y > 280 && y < 300 && x > 340 && x < 445) {
                window.location.reload();
            }
        }
    }*/


    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    for (let i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = './src/babyTail' + i + '.png';
        bigTail[i] = new Image();
        bigTail[i].src = './src/bigTail' + i + '.png';
    }
    for (let i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = './src/babyEye' + i + '.png';
        bigEye[i] = new Image();
        bigEye[i].src = './src/bigEye' + i + '.png';
    }
    for (let i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = './src/babyFade' + i + '.png';

    }

    for (let i = 0; i < 8; i++) {
        bigBodyOra[i] = new Image();
        bigBodyOra[i].src = './src/bigSwim' + i + '.png';
        bigBodyBlue[i] = new Image();
        bigBodyBlue[i].src = './src/bigSwimBlue' + i + '.png';
    }

    ctx1.font = '30px Verdana';
    ctx1.textAlign = 'center'; //属性有left,center,right,默认left

    wave = new waveObj();
    wave.init();
    halo = new haloObj();
    halo.init();

    for (let i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = './src/dust' + i + '.png';
    }

    dust = new dustObj();
    dust.init();
}

function gameloop() {
    //
    window.requestAnimFrame(gameloop);
    let now = Date.now();
    deltaTime = now - lastTime; //为使运动平滑，利用这个时间差进行调节
    lastTime = now;
    if (deltaTime > 50) deltaTime = 40;


    //console.log(deltaTime);
    drawBackground();
    //drawPlay();

    ane.draw();
    fruitMonitor();
    fruit.draw();


    ctx1.clearRect(0, 0, canWidth, canHeight);

    if (!playBegin) {
        drawPlay();
    }

    if (!isRefresh && playBegin) {
        drawPause();
    }



    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();

    data.draw();
    wave.draw();
    halo.draw();

    dust.draw();




}

function onMouseMove(e) {
    if (!data.gameOver && playBegin && playing) {
        if (e.offSetX || e.layerX) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    }


}