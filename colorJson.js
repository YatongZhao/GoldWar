/**
 * 各色金币初始化json对象
 */


var colorObj = {
    yellow: {
        probability: probabilityDistribution(2000, 800, 0.8, 0.1, disappearTime.initTime),
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
        probability: probabilityDistribution(2000, 800, 0.1, 0.5, disappearTime.initTime),
        fn: initAll,
        colorFn: blackFn,
        text: "$",
        className: "pee",
        click:[
            function () { goldPee(2) },
            seduce,
            addCombo
        ],
        maxSpeed: maxSpeed
    },
    red: {
        probability: probabilityDistribution(2000, 800, 0.03, 0.17, disappearTime.initTime),
        fn: initAll,
        colorFn: redFn,
        text: "$",
        className: "pee",
        click:[
            function () { goldPee(5) },
            seduce,
            addCombo
        ],
        maxSpeed: maxSpeed
    },
    orange: {
        probability: probabilityDistribution(2000, 800, 0.03, 0.03, disappearTime.initTime),
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
        probability: probabilityDistribution(2000, 800, 0.04, 0.2, disappearTime.initTime),
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