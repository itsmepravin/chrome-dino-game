// Canvas
let board: HTMLCanvasElement;
let boardWidth = 750;
let boardHeight = 250;
let context: CanvasRenderingContext2D;

// Dino
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg: HTMLImageElement;

let dino = {
  x: dinoX,
  y: dinoY,
  width: dinoWidth,
  height: dinoHeight,
};

// Cactus
let cactusArray: Array<Cactus> = [];

let cactusOneWidth = 34;
let cactusTwoWidth = 69;
let cactusThreeWidth = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactusImageOne: HTMLImageElement;
let cactusImageTwo: HTMLImageElement;
let cactusImageThree: HTMLImageElement;

// Physics
let velocityX = -8;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

// Types
type Cactus = {
  img: CanvasImageSource | null;
  x: number;
  y: number;
  width: number | null;
  height: number;
};

window.onload = function () {
  board = document.getElementById("board") as HTMLCanvasElement;
  board.height = boardHeight;
  board.width = boardWidth;

  context = board.getContext("2d") as CanvasRenderingContext2D;

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

  for (let i = 0; i < cactusArray.length; i++) {
    let cactus = cactusArray[i];
    cactus.x += velocityX;
    context.drawImage(
      cactus.img!,
      cactus.x,
      cactus.y,
      cactus.width!,
      cactus.height
    );
  }
}

function placeCactus() {
  let cactus: Cactus = {
    img: null,
    x: cactusX,
    y: cactusY,
    width: null,
    height: cactusHeight,
  };

  let placeCactusChance = Math.random();

  if (placeCactusChance > 0.9) {
    cactus.img = cactusImageThree;
    cactus.width = cactusThreeWidth;
    cactusArray.push(cactus);
  } else if (placeCactusChance > 0.7) {
    cactus.img = cactusImageTwo;
    cactus.width = cactusTwoWidth;
    cactusArray.push(cactus);
  } else if (placeCactusChance > 0.5) {
    cactus.img = cactusImageOne;
    cactus.width = cactusTwoWidth;
    cactusArray.push(cactus);
  }

  if (cactusArray.length > 5) cactusArray.shift();
}
