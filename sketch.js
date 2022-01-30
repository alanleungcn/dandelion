let system = []; // dandelion particle system
let dandeX = []; // dandelion x value
let dandeImg = []; // dandelion images
let dandeInterval; // dandelion interval object
let dandeNo, dandeSi, dandePs, windDeg, windVel, regenBtn, creditBtn, creditImg;

function preload() {
  creditImg = loadImage('assets/credit.png');
  dandeImg[0] = loadImage('assets/dandelion.png'); // big dandelion
  dandeImg[1] = loadImage('assets/dandelion-1.png'); // flying dandelion
  dandeImg[2] = loadImage('assets/dandelion-2.png'); // flying dandelion with face
}

function setup() {
  // environment
  //frameRate(30);
  pixelDensity(1.5);
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  // control
  dandeSi = createSlider(width / 8, width, min(width, height) / 4);
  dandeSi.input(updateDandeSi);
  dandeSi.position(25, 50);

  dandeNo = createSlider(1, floor(width / dandeSi.value()), 1, 1);
  dandeNo.input(updateDandeNo);
  dandeNo.position(25, 100);

  dandePs = createSlider(1, 25, 2, 1);
  dandePs.input(updateDandePs);
  dandePs.position(25, 150);

  windDeg = createSlider(0, 180);
  windDeg.position(25, 200);

  windVel = createSlider(10, 100);
  windVel.position(25, 250);

  regenBtn = createButton('Regenerate');
  regenBtn.mousePressed(regenerate);
  regenBtn.style('font-size', `${min(width, height) / 25}px`);
  regenBtn.position(25, 300);

  creditBtn = createButton('Credit');
  creditBtn.mousePressed(credit);
  creditBtn.style('font-size', `${min(width, height) / 25}px`);
  creditBtn.position(25, 375);
  // initial dandelion
  updateDandeNo(true);
  updateDandePs();
}

function draw() {
  // control text
  fill(0);
  textSize(32);
  text(`Dandelion size: ${round(dandeSi.value())}px`, 25, 50);
  text(`Number of dandelion: ${dandeNo.value()}`, 25, 100);
  text(`Dandelion per second: ${dandePs.value()}`, 25, 150);
  text(`Wind degree: ${windDeg.value()}°`, 25, 200);
  text(`Wind speed: ${windVel.value()}m/s`, 25, 250);
  // sky gradient
  let c1 = color('#2b9ef0'); // sky top
  let c2 = color('#90dae8'); // sky bottom
  for (let y = 0; y < height; y++) {
    n = map(y, 0, height, 0, 1);
    stroke(lerpColor(c1, c2, n));
    line(0, y, width, y);
  }
  // grass
  fill('#6fd253');
  beginShape();
  let xoff = 0;
  let y;
  for (let x = 0; x < width; x++) {
    stroke('#6fd253');
    y = map(noise(xoff), 0, 1, height / 2, height);
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
  // credit
  // let creditSize = min(width, height) / 5;
  // image(
  //   creditImg,
  //   25 + creditSize / 2,
  //   height - creditSize / 2 - 25,
  //   creditSize,
  //   creditSize
  // );
}

function addParticle() {
  for (let i = 0; i < system.length; i++) {
    system[i].addParticle();
  }
}

function credit() {
  window.open('/credit');
}

function regenerate() {
  noiseSeed(random(100));
  updateDandeNo();
}

function getNoiseY(x) {
  return map(noise(x * 0.001), 0, 1, height / 2, height);
}
