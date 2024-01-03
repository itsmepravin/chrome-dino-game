"use strict";
// Canvas
var board;
var boardWidth = 750;
var boardHeight = 250;
var context;
// Dino
var dinoWidth = 88;
var dinoHeight = 94;
var dinoX = 50;
var dinoY = boardHeight - dinoHeight;
var dinoImg;
var dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight,
};
// Cactus
var cactusArray = [];
var cactusOneWidth = 34;
var cactusTwoWidth = 69;
var cactusThreeWidth = 102;
var cactusHeight = 70;
var cactusX = 700;
var cactusY = boardHeight - cactusHeight;
var cactusImageOne;
var cactusImageTwo;
var cactusImageThree;
// Physics
var velocityX = -8;
var velocityY = 0;
var gravity = 0.4;
var gameOver = false;
var score = 0;
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");
    context.fillStyle = "green";
    context.fillRect(dino.x, dino.y, dino.width, dino.height);
    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";
    dinoImg.onload = function () {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    };
    cactusImageOne = new Image();
    cactusImageOne.src = "./img/cactus1.png";
    cactusImageTwo = new Image();
    cactusImageTwo.src = "./img/cactus2.png";
    cactusImageThree = new Image();
    cactusImageThree.src = "./img/cactus3.png";
    requestAnimationFrame(update);
    setInterval(placeCactus, 1000);
};
function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    for (var i = 0; i < cactusArray.length; i++) {
        var cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
    }
}
function placeCactus() {
    var cactus = {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight,
    };
    var placeCactusChance = Math.random();
    if (placeCactusChance > 0.9) {
        cactus.img = cactusImageThree;
        cactus.width = cactusThreeWidth;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > 0.7) {
        cactus.img = cactusImageTwo;
        cactus.width = cactusTwoWidth;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > 0.5) {
        cactus.img = cactusImageOne;
        cactus.width = cactusTwoWidth;
        cactusArray.push(cactus);
    }
    if (cactusArray.length > 5)
        cactusArray.shift();
}
