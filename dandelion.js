class Dandelion {
  constructor(x, y) {
    let offset = dandeSi.value() / 4; // offset for blob size
    this.pos = createVector(
      random(x - offset, x + offset),
      random(y - offset, y + offset)
    );
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.size = (random(0.75, 1) * dandeSi.value()) / 4;
    this.type = round(random(1, 2));
    this.theta = random(-45, 45);
    this.life = 2048;
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.pos.add(this.vel);
    this.pos.add(
      p5.Vector.fromAngle(
        -radians(windDeg.value()),
        map(windVel.value(), 1, 100, 1.5, 10)
      )
    );
    this.lifespan -= 2;
  }
  display() {
    let windVector = p5.Vector.fromAngle(
      -radians(windDeg.value()),
      map(windVel.value(), 1, 100, 0.1, 1)
    );
    let radTar = windVector.heading() + radians(90); // image offset, target degree
    push();
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.theta));
    image(dandeImg[this.type], 0, 0, this.size, this.size);
    if ((this.theta - degrees(radTar)) % 360 > 10)
      this.theta -= map(windVel.value(), 1, 100, 0.1, 0.5); // rotation speed, faster wind faster rotation
    if ((degrees(radTar) - this.theta) % 360 > 10)
      this.theta += map(windVel.value(), 1, 100, 0.1, 0.5);
    pop();
  }
  isDead() {
    return (
      this.life < 0 ||
      this.pos.x < -this.size ||
      this.pos.x > width + this.size ||
      this.pos.y < -this.size ||
      this.pos.y > height + this.size
    );
  }
}
