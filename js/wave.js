let waveObj = function() {
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
    this.type = [];

}

waveObj.prototype.num = 10;
waveObj.prototype.init = function() {
    for (let i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.r[i] = 0;
    }
}

waveObj.prototype.draw = function() {
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = 'white';
    for (let i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            //画圈圈
            this.r[i] += deltaTime * 0.04;
            if (this.r[i] > 60) {
                this.alive[i] = false;
                break;
            }
            let alpha = 1 - this.r[i] / 60;
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctx1.closePath();
            if (this.type[i] == 'blue') {
                ctx1.shadowColor = 'rgb(0, 0, 255)';
                ctx1.strokeStyle = 'rgba(0, 0, 255,' + alpha + ')';
            } else {
                ctx1.shadowColor = 'rgb(255, 153, 0)';
                ctx1.strokeStyle = 'rgba(255, 153, 0,' + alpha + ')';
            }
            ctx1.stroke();
        }
    }
    ctx1.restore();
}

waveObj.prototype.born = function(x, y, t) {
    for (let i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            //产生圈圈
            this.type[i] = t;
            this.alive[i] = true;
            this.r[i] = 15;
            this.x[i] = x;
            this.y[i] = y;
            return;
        }
    }
}