const title = document.getElementById("title");
const text = document.getElementById("text");
const heartScene = document.getElementById("heartScene");
const heart = document.getElementById("heart");
const endText = document.getElementById("endText");

/* ---------------- CONTENT ---------------- */

const titleText = "Sorry mera bachcha";
const bodyText = 
`Iss baar mai aapke birthday me nahi hu,
par maine koshish ki hai
ki aapko meri presence feel ho.

I promise…
next birthday hum saath cake cut karenge.`;

/* ---------------- STATE ---------------- */

let tIndex = 0;
let bIndex = 0;
let sceneFinished = false; // 🔒 HARD LOCK

const typingSpeedTitle = 120;
const typingSpeedBody = 45;

/* ---------------- INIT ---------------- */

title.textContent = "";
text.textContent = "";
title.style.opacity = 1;
text.style.opacity = 1;

/* ---------------- TITLE TYPE ---------------- */

function typeTitle() {
  if (sceneFinished) return;

  if (tIndex < titleText.length) {
    title.textContent += titleText.charAt(tIndex);
    tIndex++;
    setTimeout(typeTitle, typingSpeedTitle);
  } else {
    setTimeout(typeBody, 800);
  }
}

/* ---------------- BODY TYPE ---------------- */

function typeBody() {
  if (sceneFinished) return;

  if (bIndex < bodyText.length) {
    text.textContent += bodyText.charAt(bIndex);
    bIndex++;
    setTimeout(typeBody, typingSpeedBody);
  } else {
    setTimeout(triggerHeartScene, 2000);
  }
}

/* ---------------- HEART SCENE ---------------- */

function triggerHeartScene() {
  if (sceneFinished) return;

  heartScene.style.opacity = 1;

  setTimeout(() => {
    heart.style.transform = "scale(20)";
    heart.style.opacity = 0.15;
  }, 1500);

  setTimeout(() => {
    endText.style.opacity = 1;
  }, 4500);

  /* -------- SCENE END -------- */
  setTimeout(() => {
    sceneFinished = true;

    window.parent.postMessage(
      { type: "SCENE_DONE" },
      "*"
    );
  }, 7500);
}

/* ---------------- START ---------------- */

typeTitle();