function Exit(onOff,timer) {
    this.onOff = onOff;
    this.timer = timer;
    this.init();
}
Exit.prototype.count = 0;
Exit.prototype.init = function () {
    if (this.onOff == true) {
        this.in();
    } else if (this.onOff != undefined) {
        this.out();
    }
}
Exit.prototype.in = function () {
    this.__proto__.count++;
}
Exit.prototype.out = function () {
    this.__proto__.count--;
    clearTimeout(this.timer);
    if (this.__proto__.count <= 0) {
        ending();
    }
}

function End() {
    clearInterval(timer4);
    bind(oBtn, "click", gameGo);
    bind(oBox, "click", seduce);
    bind(oBox, "mouseover", seduce);
    bind(oBtn, "mouseover", goBtnMouseOver);
    bind(oBtn, "mouseout", goBtnMouseOut);
    bind(oBtn, "mouseover", showHelp);
    bind(oBtn, "mouseout", removeHelp);
    disappearTime = 2000;
    countEnd = 1;
    countTime = 1;
    numComboCount = 0;
    oBgNumber.style.opacity = 1;
    oGameOver.style.display = "block";
    jumpNumber(oGameOver, 0, 80, -2, 5);
    oBgNumber.innerHTML = "";
    oBtn.value = "GO";
}
function Go(oBtn,oBox) {
    this.btn = oBtn;
    this.box = oBox;
    this.init();
}
Go.prototype.btnClick = function () {
    unbind(this.btn, "click", this.btnClick);
    unbind(this.btn, "mouseover", goBtnMouseOver);
    unbind(this.btn, "mouseout", goBtnMouseOut)
    unbind(this.btn, "mouseover", showHelp);
    unbind(this.btn, "mouseover", removeHelp);
};
Go.prototype.init = function () {
    bind(this.box, "click", seduce);
    bind(this.box, "mouseover", seduce);
    bind(this.btn, "click", this.btnClick);
    bind(this.btn, "mouseover", goBtnMouseOver);
    bind(this.btn, "mouseover", showHelp);
    bind(this.btn, "mouseout", removeHelp);
    bind(this.btn, "mouseout", goBtnMouseOut);
    bind(document, "mousedown", clearDefault);
}
function ending() {
    clearInterval(timer4);
    bind(oBtn, "click", gameGo);
    bind(oBox, "click", seduce);
    bind(oBox, "mouseover", seduce);
    bind(oBtn, "mouseover", goBtnMouseOver);
    bind(oBtn, "mouseout", goBtnMouseOut);
    bind(oBtn, "mouseover", showHelp);
    bind(oBtn, "mouseout", removeHelp);
    disappearTime = 2000;
    countEnd = 1;
    countTime = 1;
    numComboCount = 0;
    oBgNumber.style.opacity = 1;
    oGameOver.style.display = "block";
    jumpNumber(oGameOver, 0, 80, -2, 5);
    oBgNumber.innerHTML = "";
    oBtn.value = "GO";
}
function DisappearTime(firstTime) {
    var that = this;
    this.ele = $("#helpDisappearTime").getElementsByTagName("span")[0];
    this.initTime = firstTime;
    this.exit = new Exit();
    this.timer = setInterval(function () {
        that.__proto__.timerFn.call(that);
    },2);
    this.__proto__.realTime = this.initTime;
}
DisappearTime.prototype.timerFn = function () {
    this.__proto__.realTime -= 0.1;
    console.log(this);
    this.ele.innerHTML = this.__proto__.realTime;
    console.log(this);
    console.log(this.__proto__.realTime);
    console.log(this.initTime);
    DisappearTime.prototype.clearExit.call(this);
}
DisappearTime.prototype.clearExit = function () {
    if (this.exit.count < 0) {
        clearInterval(this.__proto__.timer);
    }
}



/**
 * 清除页面默认鼠标点击事件
 * @param {*事件对象} e 
 */
function clearDefault(e) {
    e = e || event;
    e.preventDefault && e.preventDefault();
    e.returnValue && (e.returnValue = false);
}
/**
 * 根据在一个范围内变化的数值,控制概率线性变化
 * @param {*数值变化初始值} firstNum 
 * @param {*数值变化末尾值} lastNum 
 * @param {*概率变化初始值} firstProbability 
 * @param {*概率变化末尾值} lastProbability 
 * @param {*变化的数值} numX 
 */
function probabilityDistribution(firstNum, lastNum, firstProbability, lastProbability, numX) {
    var newProbability = 0;
    if (firstProbability == lastProbability) {
        return firstProbability;
    }
    newProbability = numX - firstNum;
    newProbability = newProbability / (lastNum - firstNum);
    newProbability = newProbability * (lastProbability - firstProbability);
    newProbability = newProbability + firstProbability;
    return newProbability;
}
/**
 * 根据传入的金币json对象,随机生成金币,并以相应初始化函数初始化金币对象
 * @param {*金币json对象} colorObj 
 */
function colorProbability(colorObj,newBox) {
    var randomNum = Math.random();
    var minProbability = 0;
    var maxProbability = 1;
    for (var color in colorObj) {
        var probability = colorObj[color]['probability'];
        maxProbability = probability + minProbability;
        if (randomNum < maxProbability && randomNum >= minProbability && colorObj[color].fn) {
            colorObj[color].fn(newBox);
            colorObj[color].colorFn(newBox);
        }
        minProbability = maxProbability;
    }
}
/**
 * 各色金币特性的初始化函数
 */
function yellowFn(obj) { }
function blackFn(obj) {
    obj.style.backgroundColor = "black";
    obj.style.color = "white";
}
function redFn(obj) {
    obj.style.backgroundColor = "red";
    obj.style.color = "white";
}
function orangeFn(obj) {
    obj.style.backgroundColor = "orange";
}
function greenFn(obj) {
    obj.style.backgroundColor = "green";
    obj.style.color = "white";
}
function initAll(obj) {
    obj.innerHTML = this.text;
    obj.className = this.className;
    for (var i = 0; i < this.click.length; i++) {
        bind(obj, "click", this.click[i]);
    }
    var speedX = getSpeed(this.maxSpeed)[0];
    var speedY = getSpeed(this.maxSpeed)[1];
    fly(obj, speedX, speedY, goldDistanceLimits(obj));
}
/**
 * 金币标准初始化函数
 * 
 */
function goldInit() {
    var newBox = document.createElement("div");
    oBox.appendChild(newBox);
    colorProbability(colorObj,newBox);
}
/**
 * 金币点击后弹出金币个数控制函数
 * 
 */
function goldPee(times) {
    for (var i = 0; i < times; i++) {
        goldInit();
    }
}
/**
 * 输出金币飞行范围函数
 * @param {*吐金币按钮} oBox 
 * @param {*金币对象} gold
 */
function goldDistanceLimits(gold) {
    var clientW = 0;
    var clientH = 0;
    var limitLeft = 0;
    var limitRight = 0;
    var limitTop = 0;
    limitLeft = - ((getClientArea()[0] / 2) - (parseInt(getStyle(gold.parentNode, "width")) / 2) - (parseInt(getStyle(gold, "width")) / 2));
    limitRight = (getClientArea()[0] / 2) + (parseInt(getStyle(gold.parentNode, "width")) / 2 - (parseInt(getStyle(gold, "width")) / 2));
    limitTop = -(getClientArea()[1] - parseInt(getStyle(gold.parentNode, "height")) - (parseInt(getStyle(gold, "height")) / 2) + 18);
    return [limitLeft, limitRight, limitTop];
}
/**
 * 获取可视区大小函数
 * @param {*} ev 
 */
function getClientArea(ev) {
    ev = ev || event;
    var clientW = 0;
    var clientH = 0;
    clientW = document.documentElement.clientWidth;
    clientH = document.documentElement.clientHeight;
    return [clientW, clientH];
}
/**
 * 
 * @param {*需要飞行的对象} obj 
 */
function fly(obj, speedX, speedY, arrLimits) {
    var timer = null;
    var leftLimit = 0;
    var rightLimit = 0;
    var topLimit = 0;
    var gameIn = new Exit(true);
    leftLimit = Math.ceil(arrLimits[0] * (Math.random() + 0.5))/1.5;
    rightLimit = Math.floor(arrLimits[1] * (Math.random() + 0.5))/1.5;
    topLimit = Math.ceil(arrLimits[2] * (Math.random() + 0.5))/1.5;
    timer = setInterval(function () {
        obj.style.left = parseInt(getStyle(obj, "left")) + speedX + "px";
        obj.style.top = parseInt(getStyle(obj, "top")) - speedY + "px";
        if (
            parseInt(getStyle(obj, "left")) <= leftLimit ||
            parseInt(getStyle(obj, "left")) >= rightLimit ||
            parseInt(getStyle(obj, "top")) <= topLimit
        ) {
            if (parseInt(getStyle(obj, "left")) <= leftLimit) {
                obj.style.left = leftLimit;
            } else if (parseInt(getStyle(obj, "left")) >= rightLimit) {
                obj.style.left = rightLimit;
            } else {
                obj.style.top = topLimit;
            }
            clearInterval(timer);
            timer = setTimeout(function () {
                obj.parentNode.removeChild(obj);
                var gameOut = new Exit(false,timer);
            }, 2000);
        }
    }, 10);
}
/**
 * 根据最大速度值随机得到速度
 * @param {*最大速度值} maxSpeed 
 */
function getSpeed(maxSpeed) {
    var speedX = Math.round(Math.random() * maxSpeed * 2) - 10;
    var speedY = Math.ceil(Math.random() * maxSpeed);
    return [speedX, speedY];
}
/**
 * 开始按钮鼠标移上效果
 */
function goBtnMouseOver() {
    oBtn.style.boxShadow = "2px 3px 10px rgba(0, 0, 0, .8)";
    oBtn.style.zIndex = "30";
    oBtn.style.backgroundColor = "white";
}
/**
 * 开始按钮鼠标移开效果
 */
function goBtnMouseOut() {
    oBtn.style.boxShadow = "2px 3px 5px rgba(0, 0, 0, .6)";
    oBtn.style.zIndex = "";
    oBtn.style.backgroundColor = "";
}
/**
 * 显示游戏开始提示
 */
function showHelp() {
    oHelpGo.style.display = "block";
    oHelpAll1.style.display = "block";
    oHelpAll2.style.display = "block";
}
/**
 * 移出游戏开始提示
 */
function removeHelp() {
    oHelpGo.style.display = "none";
    oHelpAll1.style.display = "none";
    oHelpAll2.style.display = "none";
}
/**
 * 吐金币按钮吐金币时的特效
 * @param {*事件对象} e 
 */
function seduce(e) {
    e = e || event;
    var timer = null;
    var count = 0;
    timer = setInterval(function () {
        if (count < 4) {
            oBox.children[count].style.display = "block";
        } else if (count < 8) {
            oBox.children[count % 4].style.display = "none";
        }
        count++;
        if (count == 8) {
            clearInterval(timer);
            timer = null;
        }
    }, 50)
}
function gameGo() {
    var timer = null;
    var count = 4;
    // 5倒计时变量
    goBtnMouseOut();
    unbind(oBtn, "click", gameGo);
    unbind(oBtn, "mouseover", goBtnMouseOver);
    unbind(oBtn, "mouseout", goBtnMouseOut)
    unbind(oBtn, "mouseover", showHelp);
    unbind(oBtn, "mouseover", removeHelp);
    oHelpGo.style.display = "none";
    oHelpAll1.style.display = "none";
    oHelpAll2.style.display = "none";
    oGameOver.style.display = "none";
    oBtn.value = "";

    oBgNumber.innerHTML = 5;
    var fontSize = 200;
    var timer2 = null;
    // 倒计时第一个数字效果
    timer2 = setInterval(function () {
        oBgNumber.style.fontSize = fontSize + "px";
        fontSize -= 20;
        if (fontSize == 40) {
            clearInterval(timer2);
            timer2 = null;
        }
    }, 10);

    timer = setInterval(function () {
        var timer3 = null;
        var speed = 10;
        oBgNumber.innerHTML = count;
        count--;
        if (count == -1) {
            clearInterval(timer);
            timer = null;
            oBgNumber.innerHTML = "GO";
            oBtn.style.boxShadow = "none";
            bind(oBox, "click", goldInit);
            bind(oBox, "click", addCombo);
            timeListener();
            goldenSeduce();
            timer3 = setTimeout(function () {
                unbind(oBox, "click", goldInit);
                unbind(oBox, "click", seduce);
                unbind(oBox, "mouseover", seduce);
                unbind(oBox, "click", addCombo);
                removeGoldenSeduce();
                if (countEnd == 1) {
                    // 解决开局不点击游戏无法到达出口bug
                    // 第二个出口--------------------------------
                    // ending();
                }
            }, 3000)
        }
        jumpNumber(oBgNumber, 200, 60);
    }, 1000)
}
function addCombo() {
    numComboCount++;
    oCombo.getElementsByTagName("span")[0].innerHTML = numComboCount;
    jumpNumber(oCombo.getElementsByTagName("span")[0], 160, 80);
}
function timeListener() {
    timer4 = setInterval(function () {
        countTime += 2;
        oTime.getElementsByTagName("span")[0].innerHTML = countTime / 100;
        disappearTime -= countTime / 5000 < 10 ? countTime / 5000 : 10;
        // disappearTime -= 25 / 100;
        if (disappearTime < 800) {
            disappearTime = 800;
        }
    }, 20)
}

function jumpNumber(obj, bigFontSize, smallFontSize, fontChangeSpeed, speed) {
    fontChangeSpeed = fontChangeSpeed || 20;
    speed = speed || 10;
    var timer2 = null;
    timer2 = setInterval(function () {
        obj.style.fontSize = bigFontSize + "px";
        if (obj.innerHTML == "GO") {
            obj.style.opacity = getStyle(obj, "opacity") - 0.1;
        }
        bigFontSize -= fontChangeSpeed;
        speed -= 2;
        if (bigFontSize == smallFontSize - fontChangeSpeed) {
            clearInterval(timer2);
            timer2 = null;
        }
    }, speed);
}
addOneMore.isFirst = true;
function addOneMore() {
    oneMorechance++;
    oOneMoreChance.getElementsByTagName("span")[0].innerHTML = oneMorechance;
    if (disappearTime > 1500) {
        disappearTime += 10;
    } else {
        disappearTime += 1000;
        if (disappearTime > 1500) {
            disappearTime = 1500;
        }
    }
}
function goldenSeduce() {
    oNumber.style.backgroundColor = "yellow";
}
function removeGoldenSeduce() {
    oNumber.style.backgroundColor = "";
}