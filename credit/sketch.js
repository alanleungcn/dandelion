let creditImg,
  xVel, // x slider
  yVel, // y slider
  x, // x pos
  y, // y pos
  xv, // x vel
  yv, // y vel
  em,
  size;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  reset();
}

function preload() {
  creditImg = loadImage('../assets/credit.png');
}

function setup() {
  colorMode(HSB);
  pixelDensity(2);
  imageMode(CENTER);
  em = 2.5 * textSize();
  createCanvas(windowWidth, windowHeight);
  reset();
}

function reset() {
  if (xVel) xVel.remove();
  if (yVel) yVel.remove();
  size = min(width, height) / 3;
  x = random(width / 4, (width / 4) * 3);
  y = random(height / 4, (height / 4) * 3);
  // slider
  xVel = createSlider(0, 50, random(1, 5), 1);
  xVel.input(xVelUpdate);
  xVel.position(em, 2 * em);

  yVel = createSlider(0, 50, random(1, 5), 1);
  yVel.input(yVelUpdate);
  yVel.position(em, 4 * em);
  // initial run
  xVelUpdate();
  yVelUpdate();
}

function draw() {
  // background
  background('#4db2ed');
  // text
  fill(0);
  noStroke();
  textSize(em);
  text(`X speed: ${xVel.value()}`, em, 1.5 * em);
  text(`Y speed: ${yVel.value()}`, em, 3.5 * em);
  image(creditImg, x, y, size, size);
  // update
  x += xv;
  y += yv;
  if (x > width - size / 2 || x < size / 2) xv = -xv;
  if (y > height - size / 2 || y < size / 2) yv = -yv;
}

function xVelUpdate() {
  if (xv > 0) xv = xVel.value();
  else xv = -xVel.value();
}

function yVelUpdate() {
  if (yv > 0) yv = yVel.value();
  else yv = -yVel.value();
}
