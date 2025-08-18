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
import { createCanvasNode } from "../factories/canvasNodeFactory.js";

export class CanvasEngine {
  constructor(mainContainerEl, canvasEl, viewport, canvasContentEl) {
    this.mainContainer = mainContainerEl;
    this.canvas = canvasEl;
    this.viewport = viewport;
    this.canvasContent = canvasContentEl;
    this.inputHandler = null;
    this.events = {
      onNodeAdded: [],
      onNodeRemoved: [],
      onCanvasCleared: [],
    };
  }

  init() {
    this.centerCanvas();
    this.setupInteractions();
  }

  centerCanvas() {
    const centerX =
      this.mainContainer.scrollWidth / 2 - this.mainContainer.clientWidth / 2;
    const centerY =
      this.mainContainer.scrollHeight / 2 - this.mainContainer.clientHeight / 2;
    this.mainContainer.scrollLeft = centerX;
    this.mainContainer.scrollTop = centerY;
  }
  setupInteractions() {
    this.inputHandler = new InputHandler(
      (input, event) => {
        updateMeta(getZoom(), getPan(this.mainContainer));
      },
      {
        onDragChange: (input, event) => {
          if (input.canDrag && input.isDragging === false) {
            handleDragMouseDown(event, this.mainContainer);
          } else if (input.isDragging) {
            handleDragMouseMove(event, this.mainContainer);
          } else {
            handleDragMouseUp();
          }
        },
        onZoomChange: (event) => {
          handleZoomWheel(event, this.viewport); // Use the scaled element
          document.getElementById("zoomHUD").textContent = `${Math.round(
            getZoom() * 100
          )}%`;
          updateMeta(getZoom(), getPan(this.mainContainer)); // Sync zoom + pan
          this.dispatch("onZoomChanged", { zoom: getZoom() });
        },
        onContextMenuChange: (toggle, event) => {
          if (toggle)
            showContextMenu(event.pageX, event.pageY, event.target, this);
          else hideContextMenu();
        },
      }
    );
  }

  /**
   * Injects a node into the canvas.
   * @param {string} type - Node template type.
   * @param {Object} options - Optional config (label, id, x, y).
   */
  addNode(type, options = {}) {
    const node = createCanvasNode(type, options);
    this.viewport.appendChild(node);
    this.dispatch("onNodeAdded", { node, type, options });
    return node;
  }

  /**
   * Removes a node from the canvas.
   * @param {HTMLElement|string} nodeOrId - Node element or its ID.
   */
  removeNode(nodeOrId) {
    const node =
      typeof nodeOrId === "string" ? this.findNodeById(nodeOrId) : nodeOrId;

    if (node && this.viewport.contains(node)) {
      this.viewport.removeChild(node);
      this.dispatch("onNodeRemoved", { node });
    }
  }

  /**
   * Clears all nodes from the canvas.
   */
  clearCanvas() {
    this.viewport.innerHTML = "";
    this.dispatch("onCanvasCleared");
  }

  /**
   * Returns all canvas nodes.
   */
  getNodes() {
    return [...this.viewport.querySelectorAll(".canvas__child")];
  }

  /**
   * Finds a node by its ID.
   * @param {string} id
   * @returns {HTMLElement|null}
   */
  findNodeById(id) {
    return this.viewport.querySelector(`#${id}`);
  }

  /**
   * Registers a callback for a specific engine event.
   * @param {string} name - Event name.
   * @param {Function} callback
   */
  on(name, callback) {
    if (this.events[name]) {
      this.events[name].push(callback);
    }
  }

  /**
   * Dispatches an engine event.
   * @param {string} name
   * @param {Object} payload
   */
  dispatch(name, payload = {}) {
    if (this.events[name]) {
      this.events[name].forEach((cb) => cb(payload));
    }
  }
}
