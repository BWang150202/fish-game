let fruitObj = function() {
    this.alive = []; //布尔值
    this.x = [];
    this.y = [];
    this.l = [];
    this.spd = [];
    this.fruitType = [];
    this.orange = new Image();
    this.blue = new Image();

    this.aneNO = [];
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function() {
    for (let i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNO[i] = 0;
        this.l[i] = 0; //果实的大小
        this.spd[i] = Math.random() * 0.017 + 0.003; //[0.003,0.02) 果实上升的速度
        this.fruitType[i] = '';
        this.born(i);
    }
    console.log('fruit')
    this.orange.src = './src/fruit.png';
    this.blue.src = './src/blue.png';

}
fruitObj.prototype.draw = function() {
    for (let i = 0; i < this.num; i++) {
        //draw
        //find an ane,fly up
        let pic;
        if (this.alive[i]) {
            if (this.fruitType[i] == 'blue') {
                pic = this.blue;
            } else {
                pic = this.orange;
            }
            if (this.l[i] < 14) { //果实长大的过程
                this.x[i] = ane.headx[this.aneNO[i]];
                this.y[i] = ane.heady[this.aneNO[i]];
                this.l[i] += this.spd[i] * deltaTime;
            } else {
                this.y[i] -= this.spd[i] * 7 * deltaTime;
            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            if (this.y[i] < -10) {
                this.alive[i] = false;
            }
        }
    }

}
fruitObj.prototype.born = function(i) {
    this.aneNO[i] = Math.floor(Math.random() * ane.num);

    /*this.x[i] = ane.headx[aneID];
    this.y[i] = ane.heady[aneID];*/
    this.l[i] = 0;
    this.alive[i] = true;
    let ran = Math.random();
    if (ran < 0.3) {
        this.fruitType[i] = 'blue';
    } else {
        this.fruitType[i] = 'orange';
    }
}

fruitObj.prototype.dead = function(i) {
    this.alive[i] = false;
}

function fruitMonitor() {
    let num = 0;
    for (let i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) num++;
    }
    if (num < 15) {
        //发送果实
        sendFruit();
        return;
    }
}

function sendFruit() {
    for (let i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            fruit.born(i);
            return;
        }
    }
}