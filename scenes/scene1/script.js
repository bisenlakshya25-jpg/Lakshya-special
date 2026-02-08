window.onload = () => {
  const layer = document.getElementById("dream-layer");
  const content = document.getElementById("love-content");

  const colors = ["#590d22","#7b002c","#a4133c","#c9184a","#ff4d6d"];
  const COUNT = 34;

  for (let i = 0; i < COUNT; i++) {
    const b = document.createElement("div");
    b.className = "balloon";

    const size = 100 + Math.random() * 70;
    b.style.setProperty("--size", size + "px");
    b.style.left = Math.random() * 100 + "vw";
    b.style.color = colors[Math.floor(Math.random() * colors.length)];
    b.style.animationDuration = 10 + Math.random() * 4 + "s";
    b.style.animationDelay = Math.random() * 3 + "s";
    b.style.setProperty("--drift", Math.random());

    layer.appendChild(b);
  }

  /* 🌙 Reveal Text after 10.5s */
  setTimeout(() => {
    content.style.opacity = "1";
    content.style.transform = "scale(1)";
  }, 10500);

  /* 🌟 END SCENE HANDLER */
  const endScene = () => {
    content.style.opacity = "0";
    content.style.transform = "scale(0.85)";
    layer.innerHTML = "";
    document.body.style.background = "#fff";

    window.removeEventListener("click", endScene);
    window.removeEventListener("touchstart", endScene);

    /* 🔔 SIGNAL: Scene 1 DONE */
    if (window.SCENE_DONE) {
      setTimeout(() => {
        window.SCENE_DONE(1);
      }, 5000); // 5 sec after completion
    }
  };

  window.addEventListener("click", endScene);
  window.addEventListener("touchstart", endScene);
};
