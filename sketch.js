let system = []; // dandelion system
let dandeX = []; // dandelion x value
let dandeImg = []; // dandelion images
let dandeInterval; // dandelion interval object
let showControl = true,
  controlBtn,
  dandeNo,
  dandeSi,
  dandePs,
  windDeg,
  windVel,
  regenBtn,
  creditBtn,
  em;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  reset();
}

function preload() {
  dandeImg[0] = loadImage('assets/dandelion.png'); // big dandelion
  dandeImg[1] = loadImage('assets/dandelion-1.png'); // flying dandelion
  dandeImg[2] = loadImage('assets/dandelion-2.png'); // flying dandelion with face
}

function setup() {
  // environment
  pixelDensity(2);
  imageMode(CENTER);
  em = 2.5 * textSize();
  createCanvas(windowWidth, windowHeight);
  reset();
}

function reset() {
  if (dandeSi) dandeSi.remove();
  if (dandeNo) dandeNo.remove();
  if (dandePs) dandePs.remove();
  if (windDeg) windDeg.remove();
  if (windVel) windVel.remove();
  if (regenBtn) regenBtn.remove();
  if (creditBtn) creditBtn.remove();
  if (controlBtn) controlBtn.remove();
  // control
  controlBtn = createButton('Toggle control');
  controlBtn.mousePressed(toggleControl);
  controlBtn.position(
    width - controlBtn.size().width - em,
    height - controlBtn.size().height - em
  );

  dandeSi = createSlider(width / 8, width / 2, min(width, height) / 4, 0.1);
  dandeSi.input(updateDandeSi);
  dandeSi.position(em, 2 * em);

  dandeNo = createSlider(1, floor(((width / dandeSi.value()) * 3) / 2), 1, 1);
  dandeNo.input(updateDandeNo);
  dandeNo.position(em, 4 * em);

  dandePs = createSlider(1, 50, random(2, 10), 1);
  dandePs.input(updateDandePs);
  dandePs.position(em, 6 * em);

  windDeg = createSlider(0, 180, random(0, 180));
  windDeg.position(em, 8 * em);

  windVel = createSlider(1, 100, random(5, 25));
  windVel.position(em, 10 * em);

  regenBtn = createButton('Regenerate');
  regenBtn.mousePressed(regenerate);
  regenBtn.position(em, 11.5 * em);

  creditBtn = createButton('Credit');
  creditBtn.mousePressed(credit);
  creditBtn.position(em, 14.5 * em);

  toggleControl();
  // initial dandelion
  updateDandeNo();
  updateDandePs();
}

function draw() {
  // sky gradient
  let c1 = color('#2b9ef0'); // top
  let c2 = color('#90dae8'); // bottom
  for (let y = 0; y < height; y++) {
    n = map(y, 0, height, 0, 1);
    stroke(lerpColor(c1, c2, n));
    line(0, y, width, y);
  }
  // ground
  fill('#6fd253');
  beginShape();
  let xoff = 0;
  let y;
  for (let x = 0; x < width; x++) {
    stroke('#6fd253');
    y = map(noise(xoff), 0, 1, height / 2, height - 3 * em);
    vertex(x, y);
    xoff += 0.001;
  }
  vertex(width, y);
  vertex(width, height);
  vertex(0, height);
  endShape();
  // dandelion
  for (let i = 0; i < dandeX.length; i++) {
    y = getNoiseY(dandeX[i]);
    image(
      dandeImg[0],
      dandeX[i],
      y - dandeSi.value() / 4,
      dandeSi.value(),
      dandeSi.value()
    );
  }
  // run each system
  for (let i = 0; i < system.length; i++) {
    system[i].run();
  }
  // control text
  if (!showControl) return;
  fill(0);
  noStroke();
  textSize(em);
  text(`Dandelion size: ${round(dandeSi.value())}px`, em, 1.5 * em);
  text(`Number of dandelion: ${dandeNo.value()}`, em, 3.5 * em);
  text(`Dandelion per second: ${dandePs.value()}`, em, 5.5 * em);
  text(`Wind angle: ${windDeg.value()}°`, em, 7.5 * em);
  text(`Wind speed: ${windVel.value()}`, em, 9.5 * em);
}
