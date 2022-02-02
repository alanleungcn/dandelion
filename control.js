function toggleControl() {
  if (showControl) {
    dandeSi.hide();
    dandeNo.hide();
    dandePs.hide();
    windDeg.hide();
    windVel.hide();
    regenBtn.hide();
    creditBtn.hide();
  } else {
    dandeSi.show();
    dandeNo.show();
    dandePs.show();
    windDeg.show();
    windVel.show();
    regenBtn.show();
    creditBtn.show();
  }
  showControl = !showControl;
}

function updateDandeSi() {
  dandeNo.remove();
  dandeNo = createSlider(1, floor(((width / dandeSi.value()) * 3) / 2), 1, 1);
  dandeNo.input(updateDandeNo);
  dandeNo.position(em, 4 * em);
  updateDandeNo();
}

function updateDandeNo() {
  dandeX = [];
  system = [];
  if (dandeNo.value() == 1) {
    dandeX[0] = width / 2;
    system.push(
      new DandelionSystem(dandeX[0], getNoiseY(dandeX[0]) - dandeSi.value() / 2)
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
        new DandelionSystem(
          dandeX[i],
          getNoiseY(dandeX[i]) - dandeSi.value() / 2
        )
      );
      tooClose = true;
    }
  }
}

function updateDandePs() {
  if (dandeInterval) clearInterval(dandeInterval);
  dandeInterval = setInterval(addDandelion, 1000 / dandePs.value());
}

function regenerate() {
  noiseSeed(Date.now());
  updateDandeNo();
}

function credit() {
  window.open('/credit');
}

function addDandelion() {
  for (let i = 0; i < system.length; i++) {
    system[i].addDandelion();
  }
}

function getNoiseY(x) {
  return map(noise(x * 0.001), 0, 1, height / 2, height - 3 * em);
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    updateDandePs();
  } else {
    if (dandeInterval) clearInterval(dandeInterval);
  }
});
