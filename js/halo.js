let haloObj = function() {
    this.x = [];
    this.y = [];
    this.r1 = [];
    this.r2 = [];
    this.alive = [];

}
haloObj.prototype.num = 5;
haloObj.prototype.init = function() {
    for (let i = 0; i < this.num; i++) {
        this.x[i] = 0;
        this.y[i] = 0;
        this.r1[i] = 0;
        this.r2[i] = 0;
        this.alive[i] = false;
    }
}

haloObj.prototype.draw = function() {

    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = 'rgb(255, 0, 0)';
    for (let i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            this.r1[i] += deltaTime * 0.04;
            this.r2[i] += deltaTime * 0.04;
            if (this.r1[i] > 80) {
                this.alive[i] = false;
                break;
            }
            let alpha = 1 - this.r1[i] / 80;
            ctx1.strokeStyle = 'rgba(255, 0, 0,' + alpha + ')';
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r1[i], 0, Math.PI * 2);
            ctx1.closePath();
            ctx1.stroke();
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r2[i], 0, Math.PI * 2);
            ctx1.closePath();

            ctx1.stroke();
        }
    }
    ctx1.restore();
}

haloObj.prototype.born = function(x, y) {
    for (let i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            //产生圈圈
            this.alive[i] = true;
            this.r1[i] = 20;
            this.r2[i] = 30;
            this.x[i] = x;
            this.y[i] = y;
            console.log('born')
            return;
        }
    }
}