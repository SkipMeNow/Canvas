import { showContextMenu, hideContextMenu } from "../ui/contextmenu.js";
import {
  handleDragMouseDown,
  handleDragMouseMove,
  handleDragMouseUp,
  handleZoomWheel,
  getZoom,
  getPan,
} from "../input/dragtopan.js";
import { InputHandler } from "../input/inputHandler.js";
import { updateMeta } from "../state/canvasState.js";

export class CanvasEngine {
  constructor(containerEl, canvasEl) {
    this.container = containerEl;
    this.canvas = canvasEl;
    this.inputHandler = null;
  }

  init() {
    this.centerCanvas();
    this.setupInteractions();
  }

  centerCanvas() {
    if (!this.container) return;
    const centerX =
      this.container.scrollWidth / 2 - this.container.clientWidth / 2;
    const centerY =
      this.container.scrollHeight / 2 - this.container.clientHeight / 2;
    this.container.scrollLeft = centerX;
    this.container.scrollTop = centerY;
    updateMeta(getZoom(), getPan(this.container));
  }

  setupInteractions() {
    this.inputHandler = new InputHandler(
      (input, event) => {
        updateMeta(getZoom(), getPan(this.container));
      },
      {
        onDragChange: (input, event) => {
          if (input.canDrag && input.isDragging === false) {
            handleDragMouseDown(event, this.container);
          } else if (input.isDragging) {
            handleDragMouseMove(event, this.container);
          } else {
            handleDragMouseUp();
          }
        },
        onZoomChange: (event) => {
          handleZoomWheel(event, this.canvas);
          updateMeta();
        },
        onContextMenuChange: (toggle, event) => {
          if (toggle) showContextMenu(event.pageX, event.pageY, event.target);
          else hideContextMenu();
        },
      }
    );
  }
}
