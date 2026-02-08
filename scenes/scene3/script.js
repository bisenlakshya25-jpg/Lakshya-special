const elements = document.querySelectorAll('.type');
const letter = document.querySelector('.letter');
const overlay = document.getElementById('gifOverlay');
const gifs = document.querySelectorAll('.gif');
const continueBtn = document.getElementById('continueBtn');

let currentGif = 0;
let typingSpeed = 55;
let typingDone = false;
let sceneFinished = false;

/* ---------- TYPING ---------- */

function typeElement(el, callback) {
  const text = el.innerHTML.trim();
  el.innerHTML = '';
  el.style.visibility = 'visible';

  let i = 0;
  const interval = setInterval(() => {
    el.innerHTML += text.charAt(i);
    letter.scrollTop = letter.scrollHeight;
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      callback && callback();
    }
  }, typingSpeed);
}

typeElement(elements[0], () => {
  typeElement(elements[1], () => {
    typeElement(elements[2], () => {
      typingDone = true;
      setTimeout(startGifFlow, 4000);
    });
  });
});

/* ---------- GIF FLOW ---------- */

function resetGifs() {
  gifs.forEach(g => g.classList.remove('active'));
  continueBtn.style.display = 'none';
  currentGif = 0;
}

function startGifFlow() {
  resetGifs();
  overlay.style.display = 'flex';
  gifs[0].classList.add('active');
}

overlay.addEventListener('click', () => {
  if (currentGif < gifs.length - 1) {
    gifs[currentGif].classList.remove('active');
    currentGif++;
    gifs[currentGif].classList.add('active');
  } else {
    continueBtn.style.display = 'block';
  }
});

/* ---------- SWIPE LOGIC ---------- */

let startX = 0;

document.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;

  if (endX - startX > 80 && overlay.style.display === 'flex') {
    overlay.style.display = 'none';
  }

  if (startX - endX > 80 && overlay.style.display !== 'flex' && typingDone) {
    startGifFlow();
  }
});

/* ---------- TAP ON LETTER ---------- */

letter.addEventListener('click', () => {
  if (typingDone && overlay.style.display !== 'flex') {
    startGifFlow();
  }
});

/* ---------- CONTINUE → SCENE DONE ---------- */

continueBtn.addEventListener('click', () => {
  if (sceneFinished) return;
  sceneFinished = true;

  setTimeout(() => {
    window.parent.postMessage(
      { type: "SCENE_DONE" },
      "*"
    );
  }, 5000);
});
