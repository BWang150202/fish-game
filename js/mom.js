let momObj = function() {
    this.x;
    this.y;
    //this.bigEye = new Image();
    //this.bigBody = new Image();
    this.bigTailTimer = 0;
    this.bigTailCount = 0;

    this.bigEyeTimer = 0;
    this.bigEyeCount = 0;
    this.bigEyeInterval = Math.random() * 1500 + 2000;

    this.bigBodyCount = 0;
}
momObj.prototype.init = function() {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    //this.bigEye.src = './src/bigEye0.png';
    //this.bigBody.src = './src/bigSwim0.png';
}
momObj.prototype.draw = function() {
    //lerp(使得一个值趋向一个目标值) x,y
    this.x = lerpDistance(mx, this.x, 0.95);
    this.y = lerpDistance(my, this.y, 0.95);
    //计算角度 Math.atan2(y,x)
    let deltaY = my - this.y;
    let deltaX = mx - this.x;
    let beta = Math.atan2(deltaY, deltaX) + Math.PI; //返回值为-PI到PI

    //lerp angle
    this.angle = lerpAngle(beta, this.angle, 0.2);

    this.bigTailTimer += deltaTime;
    if (this.bigTailTimer > 30) {
        this.bigTailCount = (this.bigTailCount + 1) % 8;
        this.bigTailTimer %= 30;
    }

    this.bigEyeTimer += deltaTime;
    if (this.bigEyeTimer > this.bigEyeInterval) {
        this.bigEyeCount = (this.bigEyeCount + 1) % 2;
        this.bigEyeTimer %= this.bigEyeInterval;
        if (this.bigEyeCount == 0) {
            this.bigEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.bigEyeInterval = 200;
        }
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    //ctx1.drawImage(this.bigBody, -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
    if (data.double == 1) //ORA
    {
        ctx1.drawImage(bigBodyOra[this.bigBodyCount], -bigBodyOra[this.bigBodyCount].width * 0.5, -bigBodyOra[this.bigBodyCount].height * 0.5);
    } else {
        ctx1.drawImage(bigBodyBlue[this.bigBodyCount], -bigBodyBlue[this.bigBodyCount].width * 0.5, -bigBodyBlue[this.bigBodyCount].height * 0.5);

    }
    ctx1.drawImage(bigTail[this.bigTailCount], -bigTail[this.bigTailCount].width * 0.5 + 25, -bigTail[this.bigTailCount].height * 0.5);

    //ctx1.drawImage(this.bigTail, -this.bigTail.width * 0.5 + 30, -this.bigTail.height * 0.5);

    //ctx1.drawImage(this.bigEye, -this.bigEye.width * 0.5, -this.bigEye.height * 0.5);
    ctx1.drawImage(bigEye[this.bigEyeCount], -bigEye[this.bigEyeCount].width * 0.5, -bigEye[this.bigEyeCount].height * 0.5);
    ctx1.restore();
}