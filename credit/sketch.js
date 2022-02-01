let creditImg, size, em, x, y, xVel, yVel, xv, yv;

function preload() {
  creditImg = loadImage('../assets/credit.png');
}

function setup() {
  pixelDensity(1.5);
  imageMode(CENTER);
  em = 2.5 * textSize();
  createCanvas(windowWidth, windowHeight);
  size = min(width, height) / 4;
  x = random(width / 4, (width / 4) * 3);
  y = random(height / 4, (height / 4) * 3);
  xVel = createSlider(0, 10, random(1, 5), 0.1);
  xVel.input(xVelUpdate);
  xVel.position(em, 2 * em);
  yVel = createSlider(0, 10, random(1, 5), 0.1);
  yVel.input(yVelUpdate);
  yVel.position(em, 4 * em);
  xVelUpdate();
  yVelUpdate();
}

function draw() {
  background('#96c8ff');
  fill(0);
  textSize(em);
  text(`X speed: ${xVel.value()}`, em, 1.5 * em);
  text(`Y speed: ${yVel.value()}`, em, 3.5 * em);
  image(creditImg, x, y, size, size);
  x += xv;
  y += yv;
  if (x > width - size / 2 || x < size / 2) xv = -xv;
  if (y > height - size / 2 || y < size / 2) yv = -yv;
  console.log(xv, yv);
}

function xVelUpdate() {
  if (xv > 0) xv = xVel.value();
  else xv = -xVel.value();
}

function yVelUpdate() {
  if (yv > 0) yv = yVel.value();
  else yv = -yVel.value();
}
