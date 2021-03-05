//大鱼跟果实的碰撞检测
//判断大鱼跟存在果实的距离
function momFruitsCollision() {
    if (!data.gameOver && playBegin) {
        for (let i = 0; i < fruit.num; i++) {
            if (fruit.alive[i]) {
                let l = calLength2(mom.x, mom.y, fruit.x[i], fruit.y[i]);
                if (l < 900) {
                    //距离30，果实被吃掉
                    fruit.dead(i);
                    data.fruitNum++;

                    mom.bigBodyCount++;
                    if (mom.bigBodyCount > 7) {
                        mom.bigBodyCount = 7;
                    }
                    if (fruit.fruitType[i] == 'blue') {
                        data.double = 2;
                    }
                    wave.born(fruit.x[i], fruit.y[i], fruit.fruitType[i]);
                }
            }
        }
    }
}

//大鱼跟小鱼的碰撞检测
function momBabyCollision() {
    if (data.fruitNum > 0 && !data.gameOver) {
        let l = calLength2(mom.x, mom.y, baby.x, baby.y);
        if (l < 900) {
            //身体复原
            baby.babyBodyCount = 0;
            //碰撞后大鱼身体状态归零
            mom.bigBodyCount = 0;
            //分数的更新
            data.addScore();
            halo.born(baby.x, baby.y);
        }
    }

}