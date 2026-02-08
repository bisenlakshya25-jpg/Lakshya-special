const pages = document.querySelectorAll('.diary-page');
const diary = document.getElementById('diary');
const sound = document.getElementById('pageSound');

let current = 0;
let soundUnlocked = false;
let sceneFinished = false; // Prevent multiple SCENE_DONE triggers

/* ---------- SOUND FIX ---------- */
function playSound() {
  if (!soundUnlocked) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

/* ---------- SHOW PAGE ---------- */
function showPage(index) {
  // Invalid index
  if (index < 0) return;

  // LAST PAGE → DIARY CLOSE
  if (index >= pages.length) {

    // prevent multiple triggers
    if (sceneFinished) return;
    sceneFinished = true;

    // Closing animation
    diary.classList.add('close');

    // 🔔 Send SCENE_DONE AFTER closing animation (adjust duration to match CSS)
    setTimeout(() => {
      window.parent.postMessage({ type: "SCENE_DONE" }, "*");
    }, 3000); // 3 sec after diary close, adjust if animation longer

    return;
  }

  // Normal page turn
  playSound();

  // Remove active from previous page
  pages[current].classList.remove('active');

  // Add active to new page
  pages[index].classList.add('active');

  // Page flip animation
  const pageContent = pages[index].querySelector('.page');
  if (pageContent) {
    pageContent.animate(
      [
        { transform: 'rotateY(0deg)' },
        { transform: 'rotateY(-180deg)' }
      ],
      {
        duration: 900,
        easing: 'ease-in-out'
      }
    );
  }

  current = index;
}

/* ---------- NEXT / PREV PAGE ---------- */
function nextPage() {
  if (sceneFinished) return; // Prevent advancing after scene finished
  showPage(current + 1);
}

function prevPage() {
  if (current === 0 || sceneFinished) return;
  showPage(current - 1);
}

/* ---------- TAP (NEXT) ---------- */
document.addEventListener('click', () => {
  if (!soundUnlocked) {
    soundUnlocked = true;
    sound.play().then(() => sound.pause());
  }
  nextPage();
});

/* ---------- SWIPE ---------- */
let startX = 0;

document.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;

  if (!soundUnlocked) {
    soundUnlocked = true;
    sound.play().then(() => sound.pause());
  }

  const diff = startX - endX;

  if (sceneFinished) return; // Prevent page turn after scene finished

  if (diff > 60) {
    nextPage();
  } else if (diff < -60) {
    prevPage();
  }
});