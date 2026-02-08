window.addEventListener('load', () => {
  const pages = document.querySelectorAll('.diary-page');
  const diary = document.getElementById('diary');
  const sound = document.getElementById('pageSound');

  let current = 0;
  let soundUnlocked = false;
  let sceneFinished = false;

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

      diary.classList.add('close');

      setTimeout(() => {
        window.parent.postMessage({ type: "SCENE_DONE" }, "*");
      }, 1200); // match closeDiary animation

      return;
    }

    playSound();

    pages[current].classList.remove('active');
    pages[index].classList.add('active');

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

  function nextPage() {
    if (sceneFinished) return;
    showPage(current + 1);
  }

  function prevPage() {
    if (current === 0 || sceneFinished) return;
    showPage(current - 1);
  }

  /* ---------- TAP ---------- */
  document.addEventListener('click', (e) => {
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
    if (!soundUnlocked) {
      soundUnlocked = true;
      sound.play().then(() => sound.pause());
    }
    const diff = startX - endX;
    if (sceneFinished) return;
    if (diff > 60) nextPage();
    else if (diff < -60) prevPage();
  });
});