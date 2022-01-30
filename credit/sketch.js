let creditImg, size, x, y, xVel, yVel, xv, yv;

function preload() {
  creditImg = loadImage('../assets/credit.png');
}

function setup() {
  pixelDensity(1.5);
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  size = min(width, height) / 4;
  x = random(width / 4, (width / 4) * 3);
  y = random(height / 4, (height / 4) * 3);
  xVel = createSlider(0, 10, random(1, 10), 0.1);
  xVel.input(xVelUpdate);
  xVel.position(25, 50);
  yVel = createSlider(0, 10, random(1, 10), 0.1);
  yVel.input(yVelUpdate);
  yVel.position(25, 100);
  xVelUpdate();
  yVelUpdate();
}

function draw() {
  background('#cae9f5');
  fill(0);
  textSize(32);
  text(`X speed: ${xVel.value()}`, 25, 50);
  text(`Y speed: ${yVel.value()}`, 25, 100);
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
