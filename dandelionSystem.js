class DandelionSystem {
  constructor(x, y) {
    this.dandelions = [];
    this.origin = createVector(x, y);
  }
  addDandelion() {
    this.dandelions.push(new Dandelion(this.origin.x, this.origin.y));
  }
  run() {
    for (let i = 0; i < this.dandelions.length; i++) {
      let d = this.dandelions[i];
      d.run();
      if (d.isDead()) this.dandelions.splice(i, 1);
    }
  }
}
