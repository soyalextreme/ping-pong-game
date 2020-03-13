const randomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const generateRandomColor = () => {
  red = randomNumber(255, 0).toString();
  green = randomNumber(255, 0).toString();
  blue = randomNumber(255, 0).toString();
  return (valueColor = `rgb( ${red}, ${green}, ${blue})`);
};

const addDificulty = () => {
  const cheat = randomNumber(100, 0);
  if (cheat > 70) {
    player1Heigh = 100;
  } else {
    player1Heigh = player1Heigh - 10;
  }
};

var canvas = document.querySelector("#gameCanvas");
var canvasContext = canvas.getContext("2d");
const fps = 24;
const soundBounce = this.document.createElement("audio");
soundBounce.src = "./sounds/Tick.wav";
const soundPointPlayer1 = this.document.createElement("audio");
soundPointPlayer1.src = "./sounds/Jig 0.wav";
const soundPointPlayer2 = this.document.createElement("audio");
soundPointPlayer2.src = "./sounds/Jig 1.wav";
const sound5Points = document.createElement("audio");
sound5Points.src = "./sounds.News.wav";
let maxPunct = document.getElementById("maxPun");
var score;

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

// ballVariables
var ballX = 400;
var ballY = 300;
var ballSize = 10;
var ballVelocity = -10;
var ballColor = generateRandomColor();
// general variables
var gravity = -9.8;
var canvasSeparation = 20;
var point = document.getElementById("points");

// player 1
var player1Width = 20;
var player1Heigh = 100;
var color1Player = generateRandomColor();
var player1PositionX = canvasSeparation;
var player1PositionY;

//player 2
var player2Width = 20;
var player2Heigh = 100;
var color2Player = generateRandomColor();
var player2PositionX;
var player2PositionY;

// evento del window
window.onload = function() {
  //alert("la pantalla cargo");
  if (!this.localStorage.getItem("high score")) {
    this.localStorage.setItem("high score", 00);
  }
  canvas.addEventListener("mousemove", evt => {
    var mousePosition = this.calculateMousePos(evt);
    paddle1Y = mousePosition.y;
    this.console.log(paddle1Y);
  });
  setInterval(render, 1000 / fps);
};

//

const render = () => {
  maxPunct.innerHTML = this.localStorage.getItem("high score");
  drawEverithing();
  ballMovement();
  movementPlayer2();
};

const drawEverithing = () => {
  // la secuencia en que se dibuja es importante

  player1PositionX = canvasSeparation;
  player1PositionY = canvas.height / 2 - player1Heigh / 2;
  player2PositionX = canvas.width - canvasSeparation * 2;
  if (ballX > 400) player2PositionY = ballY - 30;
  if (ballX < 400) player2PositionY = canvas.height / 2 - player1Heigh / 2;

  // init canvas
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  // elements
  // pelota
  drawSquare(ballX, ballY, ballSize, ballSize, ballColor);
  // PLAYER 1
  drawSquare(
    player1PositionX,
    paddle1Y,
    player1Width,
    player1Heigh,
    color1Player
  );
  //player 2
  drawSquare(
    player2PositionX,
    player2PositionY,
    player2Width,
    player2Heigh,
    color2Player
  );
};

const ballMovement = () => {
  ballX = ballX + ballVelocity * 2;
  ballY = ballY - gravity;
  console.log(ballX, ballY);
  if (ballY > canvas.height - ballSize || ballY < 0) {
    soundBounce.play();
    ballColor = generateRandomColor();
    gravity = gravity * -1;
  } else if (ballX > canvas.width) {
    // change color
    ballColor = generateRandomColor();
    // change direction
    //soundPointPlayer1.play();
    //center de ball
    ballX = 400;
    ballY = 300;
  } else if (ballX < 0) {
    // change color
    let previus = parseInt(this.localStorage.getItem("high score"));
    if (previus < score) localStorage.setItem("high score", score);
    ballColor = generateRandomColor();
    if (parseInt(point.innerHTML) > 0) soundPointPlayer2.play();
    // center ball
    ballX = 400;
    ballY = 300;
    player1Heigh = 100;
    point.innerHTML = 00;
  }
  if (ballX === player1PositionX)
    if (ballY >= paddle1Y && ballY <= paddle1Y + player1Heigh) {
      soundBounce.play();
      ballColor = generateRandomColor();
      color1Player = generateRandomColor();
      ballVelocity = -ballVelocity;
      setInterval(addDificulty(), 3000);

      score = parseInt(point.innerHTML) + 1;
      point.innerHTML = score;
      if (score % 5 === 0) {
        soundPointPlayer1.play();
      }
    }
  if (ballX === player2PositionX) {
    if (ballY >= player2PositionY && ballY <= player2PositionY + player2Heigh) {
      soundBounce.play();
      ballColor = generateRandomColor();
      color1Player = generateRandomColor();
      ballVelocity = -ballVelocity;
    }
  }
};

const movementPlayer2 = () => {};

function drawSquare(positionX, positionY, width, heght, color, center) {
  if (center === true) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(
      canvas.width / 2 - width / 2,
      canvas.height / 2 - heght / 2,
      width,
      heght
    );
  } else {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(positionX, positionY, width, heght);
  }
}
