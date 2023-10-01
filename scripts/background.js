const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const dotImage = new Image();
const bgImage = new Image();
let width = canvas.width;
let height = canvas.height;

let backgroundColor = "rgba(13,18,24,255)";
let lineColor = "rgba(255,168,248,0.2)";
let speed = 0.15;
let speedOffset = 0.3;
let lineWidth = 1.5;
let distanceLimit = 150;
let distanceMouseLimit = 290;
let gradientLine;
let gradientBackground;
let dots = [];
let mouseX = 0;
let mouseY = 0;

initialize();

function initialize() {
  dotImage.src = "images/dot.png";

  canvas.width = width = window.innerWidth;
  canvas.height = height = window.innerHeight;

  canvas.addEventListener("mousemove", mouseMove);

  createGradient();
createGradientBackground();
  spawnDots(200);

  loop();
}

function loop() {
  update();
  draw();

  window.requestAnimationFrame(loop);
}

function spawnDots(amount) {
  for (let i = 0; i < amount; i++) {
    let dot = new Dot(speed + Math.random() * speed * speedOffset);

    dot.setRandomPosition(width, height);
    dot.setRandomDirection();

    dots.push(dot);
  }
}

function update() {
  for (let i = 0; i < dots.length; i++) {
    dots[i].update(width, height);
  }
}

function draw() {
  drawBackground();
  drawLines();
  drawDots();
}

function drawBackground() {
  context.fillStyle = gradientBackground;
  context.fillRect(0, 0, width, height);
}

function drawLines() {
  context.lineWidth = lineWidth;
  context.strokeStyle = gradientLine;
  context.lineCap = "round";
  //context.shadowBlur = 10;
  //context.shadowColor = "white";

  let offset = dotImage.width / 2;

  for (let i = 0; i < dots.length; i++) {
    for (let j = 0; j < dots.length; j++) {
      if (i != j) {
        let distance = dots[i].getDistance(dots[j]);

        if (distance <= distanceLimit) {
          context.globalAlpha = 1 - distance / distanceLimit;
          context.lineWidth = (1 - distance / distanceLimit) * lineWidth;

          drawLine(dots[i].x + offset, dots[i].y + offset, dots[j].x + offset, dots[j].y + offset);
        }
      }
    }

    let distanceMouse = dots[i].getDistancePos(mouseX, mouseY);

    if (distanceMouse <= distanceMouseLimit) {
      context.globalAlpha = 1 - distanceMouse / distanceMouseLimit;
      context.lineWidth = (1 - distanceMouse / distanceMouseLimit) * lineWidth;

      drawLine(dots[i].x + offset, dots[i].y + offset, mouseX, mouseY);
    }
  }

  context.globalAlpha = 1;
}

function createGradient() {
  gradientLine = context.createLinearGradient(0, 0, width, height);
  gradientLine.addColorStop("0.1", "#ff5c33AA");
  gradientLine.addColorStop("0.2", "#ff66b3AA");
  gradientLine.addColorStop("0.4", "#ccccffAA");
  gradientLine.addColorStop("0.6", "#b3ffffAA");
  gradientLine.addColorStop("0.8", "#80ff80AA");
  gradientLine.addColorStop("0.9", "#ffff33AA");
}

function createGradientBackground() {
    gradientBackground = context.createLinearGradient(0, 0, width, height);
    gradientBackground.addColorStop("0.3", "#2e3a4aAA");
    gradientBackground.addColorStop("0.6", "#343335AA");
  }

function drawDots() {
  for (let i = 0; i < dots.length; i++) {
    context.drawImage(dotImage, dots[i].x, dots[i].y);
  }
}

function mouseMove(e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
}

function drawLine(startX, startY, endX, endY) {
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}