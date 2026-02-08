const music = document.getElementById('bgMusic');
const knife = document.getElementById('knife');
const instruction = document.getElementById('instruction');
const slice = document.getElementById('slice');
const cake = document.getElementById('cake');
const blackout = document.getElementById('blackout');
const wishText = document.getElementById('wishText');

let cutting = false;
let cutDone = false;
let musicStarted = false;
let sceneFinished = false; // 🆕 safety lock

/* ---------- Start music on first touch ---------- */
document.body.addEventListener('touchstart', () => {
  if (!musicStarted) {
    music.volume = 0.9;
    music.play().catch(() => {});
    musicStarted = true;
  }
}, { once: true });

document.addEventListener('touchstart', e => {
  if (cutDone) return;

  const x = e.touches[0].clientX;
  const y = e.touches[0].clientY;

  knife.style.left = x + 'px';
  knife.style.top = y + 'px';
  knife.style.opacity = 1;

  instruction.style.opacity = 0;
  cutting = true;
});

document.addEventListener('touchmove', e => {
  if (!cutting || cutDone) return;

  knife.style.left = e.touches[0].clientX + 'px';
  knife.style.top = e.touches[0].clientY + 'px';
});

document.addEventListener('touchend', () => {
  if (!cutting || cutDone) return;

  cutting = false;
  cutDone = true;
  knife.style.opacity = 0;

  /* ---------- Cake cut ---------- */
  setTimeout(() => {
    cake.style.transform = 'translateZ(20px) rotateY(-4deg)';
    slice.style.opacity = 1;
    slice.style.transform =
      'translateX(60px) translateZ(60px) rotateY(18deg)';
  }, 600);

  /* ---------- Music fade out ---------- */
  setTimeout(() => {
    let fade = setInterval(() => {
      if (music.volume > 0.05) {
        music.volume -= 0.05;
      } else {
        music.pause();
        music.currentTime = 0;
        clearInterval(fade);
      }
    }, 150);
  }, 1200);

  /* ---------- Blackout + wish text ---------- */
  setTimeout(() => {
    blackout.style.opacity = 1;
    wishText.style.opacity = 1;
    finishScene(); // 🆕 scene done hook
  }, 2600);
});

/* ---------- SCENE DONE ---------- */
function finishScene() {
  if (sceneFinished) return;
  sceneFinished = true;

  setTimeout(() => {
    window.parent.postMessage(
      { type: "SCENE_DONE" },
      "*"
    );
  }, 3000);
}
