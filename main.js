var oBtn = $("#btn");
var oBgNumber = $("#bgNumber");
var oNumber = $("#number");
var oBox = $("#box");
var oBox1 = $("#box1");
var oBox2 = $("#box2");
var oBox3 = $("#box3");
var oBox4 = $("#box4");
var oTime = $("#time");
var oCombo = $("#combo");
var oHelpGo = $("#helpGo");
var oHelpAll1 = $("#helpAll1");
var oHelpAll2 = $("#helpAll2");
var oHelpDisappearTime = $("#helpDisappearTime");
var oGameOver = $("#gameOver");
var oOneMoreChance = $("#oneMoreChance");
var numComboCount = 0;
var countTime = 1;
var disappearTime = 2000;
// 记录现在页面上存在的$的个数，当countEnd为0时，游戏结束
var countEnd = 1;
// 计时器，记录游戏进行秒数
var timer4 = null;
var oneMorechance = 0;
var maxSpeed = 10;

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
    fly(obj, speedX, speedY, goldDistanceLimits(obj.parentNode, obj));
}
var colorObj = {
    yellow: {
        probability: probabilityDistribution(2000, 800, 0.8, 0.1, disappearTime),
        fn: initAll,
        colorFn: yellowFn,
        text: "$",
        className: "pee",
        click:[
            function () { goldPee(1) },
            seduce,
            addCombo
        ],
        maxSpeed: maxSpeed
    },
    black: {
        probability: probabilityDistribution(2000, 800, 0.1, 0.5, disappearTime),
        fn: initAll,
        colorFn: blackFn,
        text: "$",
        className: "pee",
        click:[
            function () { goldPee(1) },
            seduce,
            addCombo
        ],
        maxSpeed: maxSpeed
    },
    red: {
        probability: probabilityDistribution(2000, 800, 0.03, 0.17, disappearTime),
        fn: initAll,
        colorFn: redFn,
        text: "$",
        className: "pee",
        click:[
            function () { goldPee(1) },
            seduce,
            addCombo
        ],
        maxSpeed: maxSpeed
    },
    orange: {
        probability: probabilityDistribution(2000, 800, 0.03, 0.03, disappearTime),
        fn: initAll,
        colorFn: orangeFn,
        text: "$",
        className: "pee",
        click:[
            function () { goldPee(1) },
            seduce,
            addCombo
        ],
        maxSpeed: maxSpeed
    },
    green: {
        probability: probabilityDistribution(2000, 800, 0.04, 0.2, disappearTime),
        fn: initAll,
        colorFn: greenFn,
        text: "$",
        className: "pee",
        click:[
            function () { goldPee(1) },
            seduce,
            addCombo
        ],
        maxSpeed: maxSpeed
    }
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
        pee();
    }
}
/**
 * 输出金币飞行范围函数
 * @param {*吐金币按钮} oBox 
 * @param {*金币对象} gold
 */
function goldDistanceLimits(oBox, gold) {
    var clientW = 0;
    var clientH = 0;
    var limitLeft = 0;
    var limitRight = 0;
    var limitTop = 0;
    limitLeft = - ((getClientArea()[0] / 2) - (parseInt(getStyle(oBox, "width")) / 2) - (parseInt(getStyle(gold, "width")) / 2));
    limitRight = (getClientArea()[0] / 2) + (parseInt(getStyle(oBox, "width")) / 2 - (parseInt(getStyle(gold, "width")) / 2));
    limitTop = -(getClientArea()[1] - parseInt(getStyle(oBox, "height")) - (parseInt(getStyle(gold, "height")) / 2) + 18);
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
            // if (parseInt(getStyle(obj, "left")) <= arrLimits[0]) {
            //     obj.style.left = arrLimits[0];
            // } else if (parseInt(getStyle(obj, "left")) >= arrLimits[1]) {
            //     obj.style.left = arrLimits[1];
            // } else {
            //     obj.style.top = arrLimits[2];
            // }
            clearInterval(timer);
            timer = setTimeout(function () {
                obj.parentNode.removeChild(obj);
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
                    ending();
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























/**
 * 游戏主体函数
 * @param {*} e 
 */






















// function pee(e) {
//     e = e || event;
//     countEnd++;
//     var timer = null;
//     var newBox = document.createElement("div");
//     var trueDisappearTime = 0;
//     trueDisappearTime = disappearTime;
//     newBox.className = "pee";
//     // newBox.style.boxShadow = "2px 3px 5px rgba(0, 0, 0, 0,8)";
//     // newBox.style.background = "none";
//     // newBox.style.backgroundColor = "yellow";
//     // newBox.style.zIndex = "1000";
//     var times = 1;
//     bind(newBox, "click", function () {
//         for (var i = 0; i < times; i++) {
//             pee();
//             // addCombo();
//         }
//     });

//     bind(newBox, "click", addCombo);
//     bind(newBox, "click", seduce);
//     oBox.appendChild(newBox);
//     // bind(newBox, "click", addCombo);
//     var speedX = 0;
//     var speedY = 0;
//     var maxY;
//     var maxX;
//     // pee();
//     speedY = Math.ceil(10 * Math.random());
//     speedX = Math.ceil(10 * Math.random()) - 5;

//     // 控制各色金币出现概率-----------------------------------------------------------------------------
//     var colorObj = {
//         yellow: {
//             probability: probabilityDistribution(2000, 800, 0.8, 0.1, disappearTime),
//             fn: yellowFn
//         },
//         black: {
//             probability: probabilityDistribution(2000, 800, 0.1, 0.5, disappearTime),
//             fn: blackFn
//         },
//         red: {
//             probability: probabilityDistribution(2000, 800, 0.03, 0.17, disappearTime),
//             fn: redFn
//         },
//         orange: {
//             probability: probabilityDistribution(2000, 800, 0.03, 0.03, disappearTime),
//             fn: orangeFn
//         },
//         green: {
//             probability: probabilityDistribution(2000, 800, 0.04, 0.2, disappearTime),
//             fn: greenFn
//         }
//     }
//     var probabilityMax = 2000;
//     var numRandom = Math.random() * 1000;
//     if (disappearTime < 1200) {
//         numRandom = Math.random() * 160;
//     } else if (disappearTime < 1500) {
//         numRandom = Math.random() * 250;
//     } else if (disappearTime < 1800) {
//         numRandom = Math.random() * 500;
//     }
//     if (numRandom < 100) {
//         newBox.style.backgroundColor = "black";
//         newBox.style.color = "white";
//         times = 2;
//     } else if (numRandom >= 100 && numRandom < 120) {
//         newBox.style.backgroundColor = "red";
//         newBox.style.color = "white";
//         newBox.style.border = "1px solid black";
//         newBox.style.opacity = 0.3;
//         times = 5;
//     } else if (numRandom < 125) {
//         newBox.style.backgroundColor = "orange";
//         times = 1;
//         if (trueDisappearTime < 1500) {
//             trueDisappearTime = 1500;
//         }
//     } else if (numRandom < 145) {
//         newBox.style.backgroundColor = "green";
//         trueDisappearTime = 5000;
//     }
//     if (e && e.target.style.backgroundColor == "orange") {
//         if (addOneMore.isFirst) {
//             addOneMore();
//             oHelpDisappearTime.getElementsByTagName("span")[0].innerHTML = Math.floor(disappearTime) / 1000 > 0 ? Math.floor(disappearTime) / 1000 : 0;
//             e.target.style.backgroundColor = "yellow";
//         }
//         addOneMore.isFirst = false;
//     }

//     newBox.innerHTML = "$";
//     // oNumber.innerHTML = "$";

//     maxY = Math.ceil(document.documentElement.clientHeight * Math.random() + 100);
//     timer = setInterval(function () {
//         newBox.style.left = parseInt(getStyle(newBox, "left")) + speedX + "px";
//         newBox.style.top = parseInt(getStyle(newBox, "top")) - speedY + "px";
//         console.log(disappearTime);
//         // 显示金币可在桌面上停留的时间
//         oHelpDisappearTime.getElementsByTagName("span")[0].innerHTML = Math.floor(disappearTime) / 1000 > 0 ? Math.floor(disappearTime) / 1000 : 0;
//         if (parseInt(getStyle(newBox, "top")) <= -maxY) {
//             clearInterval(timer);
//             timer = setTimeout(function () {
//                 oBox.removeChild(newBox);
//                 countEnd--;
//                 addOneMore.isFirst = true;
//                 if (countEnd <= 1) {
//                     // alert("游戏结束");
//                     if (oneMorechance > 0) {
//                         oneMorechance--;
//                         oOneMoreChance.getElementsByTagName("span")[0].innerHTML = oneMorechance;
//                         for (var i = 0; i < 5; i++) {
//                             pee();
//                             addCombo();
//                         }
//                         return;
//                     }
//                     // 游戏出口---------------------------------------------------------------
//                     // 重置开始---------------------------------------------------------------
//                     ending();
//                 }
//             }, trueDisappearTime)
//         }
//     }, 10)
// }
