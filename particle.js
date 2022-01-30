class DandelionParticle {
  constructor(x, y, size, type) {
    let offset = dandeSi.value() / 4;
    this.pos = createVector(
      random(x - offset, x + offset),
      random(y - offset, y + offset)
    );
    this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
    this.acc = createVector(random(0.001, 0.005), 0.001);
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
        -(windDeg.value() * PI) / 180,
        map(windVel.value(), 10, 100, 1, 5)
      )
    );
    this.lifespan -= 2;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate((PI / 180) * this.theta);
    image(dandeImg[this.type], 0, 0, this.size, this.size);
    //this.theta += (this.vel.x * this.vel.mag()) / 100;
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
