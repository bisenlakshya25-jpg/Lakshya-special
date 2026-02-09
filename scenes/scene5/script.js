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
let sceneFinished = false; // 🔒 HARD LOCK

/* ---------- MUSIC (SAFE START) ---------- */

document.body.addEventListener('touchstart', () => {
  if (!musicStarted) {
    music.volume = 0.9;
    music.play().catch(() => {});
    musicStarted = true;
  }
}, { once: true });

/* ---------- CUT START ---------- */

document.addEventListener('touchstart', e => {
  if (sceneFinished || cutDone) return;

  cutting = true;

  const x = e.touches[0].clientX;
  const y = e.touches[0].clientY;

  knife.style.left = x + 'px';
  knife.style.top = y + 'px';
  knife.style.opacity = 1;

  instruction.style.opacity = 0;
});

/* ---------- CUT MOVE ---------- */

document.addEventListener('touchmove', e => {
  if (!cutting || cutDone || sceneFinished) return;

  knife.style.left = e.touches[0].clientX + 'px';
  knife.style.top = e.touches[0].clientY + 'px';
});

/* ---------- CUT END ---------- */

document.addEventListener('touchend', () => {
  if (!cutting || cutDone || sceneFinished) return;

  cutting = false;
  cutDone = true;
  knife.style.opacity = 0;

  runCakeCut();
});

/* ---------- CAKE CUT SEQUENCE ---------- */

function runCakeCut() {

  /* Cake animation */
  setTimeout(() => {
    cake.style.transform = 'translateZ(20px) rotateY(-4deg)';
    slice.style.opacity = 1;
    slice.style.transform =
      'translateX(60px) translateZ(60px) rotateY(18deg)';
  }, 600);

  /* Music fade */
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

  /* Blackout + Wish */
  setTimeout(() => {
    blackout.style.opacity = 1;
    wishText.style.opacity = 1;
  }, 2600);

  /* Scene end */
  setTimeout(() => {
    sceneFinished = true;

    window.parent.postMessage(
      { type: "SCENE_DONE" },
      "*"
    );
  }, 4600);
}