class DandelionParticleSystem {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }
  addParticle() {
    this.particles.push(
      new DandelionParticle(
        this.origin.x,
        this.origin.y,
        random(0.75, 1),
        round(random(1, 2))
      )
    );
  }
  run() {
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      p.run();
      if (p.isDead()) this.particles.splice(i, 1);
    }
  }
}
