import { enableDragToPan } from "./dragtopan.js";
import { handleContextMenu } from "./contextmenu.js";

const container = document.querySelector(".panel__main"); //Canvas

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
    handleContextMenu(container);

    const content = document.querySelector(".canvas__content");
    if (content) {
      enableDragToPan({ container, content });
    }
  });
});
