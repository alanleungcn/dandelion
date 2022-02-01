class DandelionParticle {
  constructor(x, y, size, type) {
    let offset = dandeSi.value() / 4;
    this.pos = createVector(
      random(x - offset, x + offset),
      random(y - offset, y + offset)
    );
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(random(-0.001, 0.001), random(-0.001, 0.001));
    this.life = 2048;
    this.size = (size * dandeSi.value()) / 4;
    this.type = type;
    this.theta = random(-45, 45);
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.pos.add(
      p5.Vector.fromAngle(
        -radians(windDeg.value()),
        map(windVel.value(), 10, 100, 2, 5)
      )
    );
    this.lifespan -= 2;
  }
  display() {
    let windVector = p5.Vector.fromAngle(
      -radians(windDeg.value()),
      map(windVel.value(), 1, 100, 0.1, 1)
    );
    let radTar = windVector.heading() + radians(90); // offset for image
    push();
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.theta));
    image(dandeImg[this.type], 0, 0, this.size, this.size);
    if ((this.theta - degrees(radTar)) % 360 > 10)
      this.theta -= map(windVel.value(), 0, 100, 0.1, 0.5); // rotation speed
    if ((degrees(radTar) - this.theta) % 360 > 10)
      this.theta += map(windVel.value(), 0, 100, 0.1, 0.5); // rotation speed
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
