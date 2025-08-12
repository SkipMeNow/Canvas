import {
  showContextMenu,
  hideContextMenu,
  isClickOutside,
  isContextMenuVisible,
} from "./contextmenu.js";

import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMouseLeave,
  handleWheel,
} from "./dragtopan.js";

const wholePanel = document.querySelector("#panel");
const mainContainer = document.querySelector(".panel__main");
const canvas = document.querySelector(".canvas__content");

function centerCanvas() {
  if (!mainContainer) return;
  const centerX = mainContainer.scrollWidth / 2 - mainContainer.clientWidth / 2;
  const centerY =
    mainContainer.scrollHeight / 2 - mainContainer.clientHeight / 2;
  mainContainer.scrollLeft = centerX;
  mainContainer.scrollTop = centerY;
}

function setupInteractions(container, content) {
  container.addEventListener("mousedown", (e) => {
    handleMouseDown(e, container);
  });

  container.addEventListener("mousemove", (e) => {
    handleMouseMove(e, container);
  });

  container.addEventListener("mouseup", () => {
    handleMouseUp(container);
  });

  container.addEventListener("mouseleave", () => {
    handleMouseLeave(container);
  });

  mainContainer.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    showContextMenu(e.pageX, e.pageY);
  });

  document.addEventListener("click", (e) => {
    if (isClickOutside(e.target)) {
      hideContextMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideContextMenu();
    }
  });

  contextMenu.addEventListener("mouseleave", () => {
    if (isContextMenuVisible) {
      hideContextMenu();
    }
  });

  container.addEventListener(
    "wheel",
    (e) => {
      handleWheel(e, content);
    },
    { passive: false }
  );
}

window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    centerCanvas();

    if (!mainContainer || !canvas) {
      console.warn("Main container or canvas not found.");
      return;
    }

    setupInteractions(mainContainer, canvas);
  });
});
