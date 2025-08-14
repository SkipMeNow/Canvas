import {
  showContextMenu,
  hideContextMenu,
  isClickOutside,
  isContextMenuVisible,
} from "./contextmenu.js";

import {
  handleDragMouseDown,
  handleDragMouseMove,
  handleDragMouseUp,
  handleZoomWheel,
} from "./dragtopan.js";

import { InputHandler } from "./inputHandler.js";

const mainContainer = document.querySelector("#panel");
const canvas = document.querySelector("#canvas");

function centerCanvas() {
  if (!mainContainer) return;
  const centerX = mainContainer.scrollWidth / 2 - mainContainer.clientWidth / 2;
  const centerY =
    mainContainer.scrollHeight / 2 - mainContainer.clientHeight / 2;
  mainContainer.scrollLeft = centerX;
  mainContainer.scrollTop = centerY;
}

function setupInteractions(container, content) {
  const inputHandler = new InputHandler((input, event) => {}, {
    onDragChange: (input, event) => {
      if (input.canDrag && input.isDragging == false) {
        handleDragMouseDown(event, container);
      } else if (input.isDragging) {
        handleDragMouseMove(event, container);
      } else {
        handleDragMouseUp();
      }
    },
    onZoomChange(event) {
      handleZoomWheel(event, content);
    },
    onContextMenuChange(toggle, event) {
      if (toggle) showContextMenu(event.pageX, event.pageY, event.target);
    },
  });
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
