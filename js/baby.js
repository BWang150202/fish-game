let babyObj = function() {
    this.x;
    this.y;
    this.angle;
    //this.babyBody = new Image();


    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = Math.random() * 1500 + 2000;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}
babyObj.prototype.init = function() {
    this.x = canWidth * 0.4;
    this.y = canHeight * 0.4;
    this.angle = 0;
    //this.babyBody.src = './src/babyFade0.png';

}
babyObj.prototype.draw = function() {
    this.x = lerpDistance(mom.x - 25, this.x, 0.95);
    this.y = lerpDistance(mom.y - 30, this.y, 0.95);

    let deltaX = mom.x - 15 - this.x;
    let deltaY = mom.y - 20 - this.y
    let beta = Math.atan2(deltaY, deltaX) + Math.PI
    this.angle = lerpAngle(beta, this.angle, 0.6);

    //小鱼尾巴计数

    this.babyTailTimer += deltaTime;

    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;
    }

    //小鱼眼睛
    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if (this.babyEyeCount == 0) {
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.babyEyeInterval = 200;
        }
    }

    //小鱼身体

    if (playBegin && playing) {
        this.babyBodyTimer += deltaTime;
        if (this.babyBodyTimer > 300) {
            this.babyBodyCount = this.babyBodyCount + 1;
            if (this.babyBodyCount > 19) {
                this.babyBodyCount = 19;
                //游戏结束
                data.gameOver = true;

            }
            this.babyBodyTimer %= 300;
        }
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);


    ctx1.drawImage(babyTail[this.babyTailCount], -babyTail[this.babyTailCount].width * 0.5 + 21, -babyTail[this.babyTailCount].height * 0.5);
    // ctx1.drawImage(this.babyBody, -this.babyBody.width * 0.5, -this.babyBody.height * 0.5);
    ctx1.drawImage(babyBody[this.babyBodyCount], -babyBody[this.babyBodyCount].width * 0.5, -babyBody[this.babyBodyCount].height * 0.5);
    ctx1.drawImage(babyEye[this.babyEyeCount], -babyEye[this.babyEyeCount].width * 0.5, -babyEye[this.babyEyeCount].height * 0.5);
    //ctx1.drawImage(this.babyEye, -this.babyEye.width * 0.5, -this.babyEye.height * 0.5);
    ctx1.restore();
}