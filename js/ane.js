let aneObj = function() {
    //开始点，控制点，结束点(sin控制)
    this.rootx = []; //开始点的x坐标，y坐标统为canheight;将开始点网上移一段距离就是控制点
    this.headx = []; //头部x
    //this.len = [];
    this.heady = []; //头部y
    this.alpha = 0;
    this.amp = []; //海葵摆动的振幅

}
aneObj.prototype.num = 50;
aneObj.prototype.init = function() {

    for (let i = 0; i < this.num; i++) {
        this.rootx[i] = i * 16 + Math.random() * 20;
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        //this.len[i] = 200 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 + 50;
    }
    console.log('ane')
}
aneObj.prototype.draw = function() {
    this.alpha += deltaTime * 0.001;
    let l = Math.sin(this.alpha); //y坐标 [-1.1]
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = '20';
    ctx2.strokeStyle = '#3b154e ';
    ctx2.lineCap = 'round';
    for (let i = 0; i < this.num; i++) {
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
}