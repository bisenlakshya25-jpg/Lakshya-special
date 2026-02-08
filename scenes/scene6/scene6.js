const title = document.getElementById("title");
const text = document.getElementById("text");
const heartScene = document.getElementById("heartScene");
const heart = document.getElementById("heart");
const endText = document.getElementById("endText");

/* Content */
const titleText = "Sorry mera bachcha";
const bodyText = 
`Iss baar mai aapke birthday me nahi hu,
par maine koshish ki hai
ki aapko meri presence feel ho.

I promise…
next birthday hum saath cake cut karenge.`;

/* Typing settings */
let tIndex = 0;
let bIndex = 0;
const typingSpeedTitle = 120;
const typingSpeedBody = 45;

let sceneFinished = false; // 🆕 safety lock

/* Clear initial text */
title.textContent = "";
text.textContent = "";
title.style.opacity = 1;
text.style.opacity = 1;

/* Type title */
function typeTitle() {
  if (tIndex < titleText.length) {
    title.textContent += titleText.charAt(tIndex);
    tIndex++;
    setTimeout(typeTitle, typingSpeedTitle);
  } else {
    setTimeout(typeBody, 800);
  }
}

/* Type body */
function typeBody() {
  if (bIndex < bodyText.length) {
    text.textContent += bodyText.charAt(bIndex);
    bIndex++;
    setTimeout(typeBody, typingSpeedBody);
  } else {
    setTimeout(triggerHeartScene, 2000);
  }
}

/* Heart scene trigger */
function triggerHeartScene() {
  heartScene.style.opacity = 1;

  setTimeout(() => {
    heart.style.transform = "scale(20)";
    heart.style.opacity = 0.15;
  }, 1500);

  setTimeout(() => {
    endText.style.opacity = 1;
    finishScene(); // 🆕 scene done hook
  }, 4500);
}

/* ---------- SCENE DONE ---------- */
function finishScene() {
  if (sceneFinished) return;
  sceneFinished = true;

  if (window.SCENE_DONE) {
    setTimeout(() => {
      window.SCENE_DONE(6); // 👈 Scene 6 (final)
    }, 5000); // emotional pause
  }
}

/* Start typing */
typeTitle();
