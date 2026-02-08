const scenes = [
  "scene1",
  "scene2",
  "scene3",
  "scene4",
  "scene5",
  "scene6"
];

let current = 0;
const frame = document.getElementById("sceneFrame");
const fade = document.getElementById("fade");

window.addEventListener("message", e => {
  if (!e.data || e.data.type !== "SCENE_DONE") return;

  if (current >= scenes.length - 1) return;

  fade.style.opacity = 1;

  setTimeout(() => {
    current++;
    frame.src = `scenes/${scenes[current]}/index.html`;
    fade.style.opacity = 0;
  }, 1200);
});
