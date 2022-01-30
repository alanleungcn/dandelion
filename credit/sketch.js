let creditImg, size;

function preload() {
  creditImg = loadImage('../assets/credit.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  size = min(width, height) / 4;
}

function draw() {
  background('#cae9f5');
  image(creditImg, width / 2, height / 2, size, size);
}
