let dataObj = function() {
    this.fruitNum = 0; //吃到的果实数量
    this.double = 1; //蓝色加倍
    this.score = 0;
    this.gameOver = false;
    this.alpha = 0;
}
dataObj.prototype.reset = function() {
    this.fruitNum = 0;
    this.double = 1;
}
dataObj.prototype.draw = function() {
    let w = can1.width;
    let h = can1.height;
    ctx1.save();
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = 'white';
    ctx1.fillStyle = 'white'; //定义画布颜色

    //ctx1.fillText('num ' + this.fruitNum, w * 0.5, h - 50); //绘制字体
    //ctx1.fillText('double ' + this.double, w * 0.5, h - 80);
    ctx1.fillText('score ' + this.score, w * 0.5, h - 20);
    if (this.gameOver) {

        ctx1.shadowBlur = 10;
        ctx1.shadowColor = 'white';
        this.alpha += deltaTime * 0.001;
        if (this.alpha > 1) {
            this.alpha = 1;
        }
        ctx1.fillStyle = 'rgba(255,255,255,' + this.alpha + ')'
        ctx1.fillText('GAMEOVER ', w * 0.5, h * 0.3);
        // ctx1.fillText('本局得分： ' + this.score, w * 0.5, h * 0.5);
        ctx1.fillText('重新游戏 ', w * 0.5, h * 0.5);

        isRefresh = true;
        //playBegin = false;

    }
    ctx1.restore();
}
dataObj.prototype.addScore = function() {
    this.score += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1;
    // console.log(this.score);
}