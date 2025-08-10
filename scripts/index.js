import { enableDragToPan } from "./DragtoPan.js";

const container = document.querySelector(".panel__main");

// Center the scroll position
function centerCanvas() {
  if (!container) return;

  const centerX = container.scrollWidth / 2 - container.clientWidth / 2;
  const centerY = container.scrollHeight / 2 - container.clientHeight / 2;
  container.scrollLeft = centerX;
  container.scrollTop = centerY;
}

// Wait for layout to settle
window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    centerCanvas();

    const content = document.querySelector(".canvas__content");
    if (content) {
      enableDragToPan({ container, content });
    }
  });
});
