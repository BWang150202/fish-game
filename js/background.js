function drawBackground() {
    ctx2.drawImage(bgPic, 0, 0, canWidth, canHeight);


}

function drawPlay() {


    //console.log(plBe.height)
    ctx1.save();

    ctx1.shadowBlur = 10;
    ctx1.shadowColor = 'white';

    ctx1.fillStyle = 'white'; //定义画布颜色
    ctx1.fillText('开始 ', canWidth * 0.5, canHeight * 0.8);
    // ctx1.translate(400, 400); //can1.width * 0.5, can1.height * 0.5,
    //ctx1.drawImage(plBe, -plBe.width * 0.5, -plBe.height * 0.5) //-plBe.width * 0.5, -plBe.height * 0.5);
    ctx1.restore();



}

function drawPause() {


    //console.log(plBe.height)
    ctx1.save();

    ctx1.shadowBlur = 10;
    ctx1.shadowColor = 'yellow';

    ctx1.fillStyle = 'yellow'; //定义画布颜色
    if (isPause) {
        ctx1.fillText('继续 ', canWidth * 0.8, canHeight * 0.95);
    } else {
        ctx1.fillText('暂停 ', canWidth * 0.8, canHeight * 0.95);
    }
    ctx1.restore();



}