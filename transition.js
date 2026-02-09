const scenes = [
  "scene1.html",
  "scene2.html",
  "scene3.html",
  "scene4.html",
  "scene5.html",
  "scene6.html"
];

let currentSceneIndex = 0;
let loading = false;

const container = document.getElementById("scene-container");

/* ---------- LOAD SCENE ---------- */

function loadScene(index) {
  if (loading || index >= scenes.length) return;
  loading = true;

  container.innerHTML = "";

  const iframe = document.createElement("iframe");
  iframe.src = scenes[index];
  iframe.className = "scene-frame";
  iframe.allow = "autoplay; fullscreen";
  iframe.onload = () => loading = false;

  container.appendChild(iframe);
}

/* ---------- LISTEN FOR SCENE DONE ---------- */

window.addEventListener("message", (e) => {
  if (!e.data || e.data.type !== "SCENE_DONE") return;

  currentSceneIndex++;

  if (currentSceneIndex < scenes.length) {
    setTimeout(() => loadScene(currentSceneIndex), 1200);
  }
});

/* ---------- START ---------- */

loadScene(currentSceneIndex);