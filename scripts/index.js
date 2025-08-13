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
  handleDragMouseLeave,
  handleZoomWheel,
} from "./dragtopan.js";

import { InputHandler } from "./inputHandler.js";

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
  // container.addEventListener("mousedown", (e) => {
  //   handleDragMouseDown(e, container);
  // });
  // container.addEventListener("mousemove", (e) => {
  //   handleDragMouseMove(e, container);
  // });
  // container.addEventListener("mouseup", () => {
  //   handleDragMouseUp(container);
  // });
  // container.addEventListener("mouseleave", () => {
  //   handleMouseLeave(container);
  // });
  // mainContainer.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  //   showContextMenu(e.pageX, e.pageY);
  // });
  // document.addEventListener("click", (e) => {
  //   if (isClickOutside(e.target)) {
  //     hideContextMenu();
  //   }
  // });
  // document.addEventListener("keydown", (e) => {
  //   if (e.key === "Escape") {
  //     hideContextMenu();
  //   }
  // });
  // contextMenu.addEventListener("mouseleave", () => {
  //   if (isContextMenuVisible) {
  //     hideContextMenu();
  //   }
  // });
  // container.addEventListener(
  //   "wheel",
  //   (e) => {
  //     handleWheel(e, content);
  //   },
  //   { passive: false }
  // );
  const inputHandler = new InputHandler((input, event) => {}, {
    onMouseEvent: (input, event) => {},
    onDragChange: (input, event) => {
      if (input.canDrag && input.isDragging == false) {
        handleDragMouseDown(event, container);
      } else if (input.isDragging) {
        handleDragMouseMove(event, container);
      } else {
        handleDragMouseUp(container);
      }
    },
    onZoomChange(event) {
      handleZoomWheel(event, content);
    },
    onContextMenuChange(event) {
      showContextMenu(event.pageX, event.pageY);
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
