// scenes/scene2/script.js

window.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.diary-page');
  const diary = document.getElementById('diary');
  const sound = document.getElementById('pageSound');

  if (!pages.length) return; // Safety

  let current = 0;
  let soundUnlocked = false;
  let sceneFinished = false;

  // Initial page visibility
  pages.forEach((page, i) => page.style.display = i === 0 ? 'block' : 'none');

  /* ---------- SOUND ---------- */
  function playSound() {
    if (!soundUnlocked) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  /* ---------- SHOW PAGE ---------- */
  function showPage(index) {
    if (index < 0) return;

    if (index >= pages.length) {
      if (sceneFinished) return;
      sceneFinished = true;

      // Close animation
      diary.classList.add('close');

      // SCENE_DONE after close animation (matches CSS)
      setTimeout(() => {
        window.parent.postMessage({ type: "SCENE_DONE" }, "*");
      }, 1200);

      return;
    }

    // Normal page turn
    playSound();
    pages[current].style.display = 'none';
    pages[index].style.display = 'block';

    // Flip animation
    const pageContent = pages[index].querySelector('.page');
    if (pageContent) {
      pageContent.animate(
        [{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-180deg)' }],
        { duration: 900, easing: 'ease-in-out' }
      );
    }

    current = index;
  }

  /* ---------- NEXT / PREV ---------- */
  function nextPage() { if (!sceneFinished) showPage(current + 1); }
  function prevPage() { if (!sceneFinished && current > 0) showPage(current - 1); }

  /* ---------- TAP ---------- */
  document.addEventListener('click', () => {
    if (!soundUnlocked) {
      soundUnlocked = true;
      sound.play().then(() => sound.pause());
    }
    nextPage();
  });

  /* ---------- SWIPE ---------- */
  let startX = 0;
  document.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  document.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (!soundUnlocked) { soundUnlocked = true; sound.play().then(() => sound.pause()); }

    const diff = startX - endX;
    if (sceneFinished) return;

    if (diff > 60) nextPage();
    else if (diff < -60) prevPage();
  });
});