function updateDandeNo() {
  dandeX = [];
  system = [];
  if (dandeNo.value() == 1) {
    dandeX[0] = width / 2;
    system.push(
      new DandelionParticleSystem(
        dandeX[0],
        getNoiseY(dandeX[0]) - dandeSi.value() / 2
      )
    );
  } else {
    let rng;
    let tooClose = true;
    for (let i = 0; i < dandeNo.value(); i++) {
      rng = random(width);
      while (tooClose) {
        tooClose = dandeX.find((e) => abs(e - rng) < dandeSi.value() / 3);
        if (tooClose) rng = random(width);
        else tooClose = false;
      }
      dandeX.push(rng);
      system.push(
        new DandelionParticleSystem(
          dandeX[i],
          getNoiseY(dandeX[i]) - dandeSi.value() / 2
        )
      );
      tooClose = true;
    }
  }
}

function updateDandeSi() {
  dandeNo.remove();
  dandeNo = createSlider(1, floor(width / dandeSi.value()), 1, 1);
  dandeNo.input(updateDandeNo);
  dandeNo.position(25, 100);
  updateDandeNo();
}

function updateDandePs() {
  console.log(1000 / dandePs.value());
  if (dandeInterval) clearInterval(dandeInterval);
  dandeInterval = setInterval(addParticle, 1000 / dandePs.value());
}
