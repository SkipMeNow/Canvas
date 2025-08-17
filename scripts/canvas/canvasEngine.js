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
  constructor(containerEl, canvasEl, canvasWrapperEL, canvasContentEl) {
    this.container = containerEl;
    this.canvas = canvasEl;
    this.canvasWrapper = canvasWrapperEL;
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
      this.container.scrollWidth / 2 - this.container.clientWidth / 2;
    const centerY =
      this.container.scrollHeight / 2 - this.container.clientHeight / 2;
    this.container.scrollLeft = centerX;
    this.container.scrollTop = centerY;
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
          handleZoomWheel(event, this.canvasWrapper); // Use the scaled element
          updateMeta(getZoom(), getPan(this.container)); // Sync zoom + pan
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

  setZoom(level, center = true) {
    const content = this.canvasContent;
    const container = this.container;

    const oldZoom = getZoom();
    const newZoom = Math.min(Math.max(0.1, level), 4);
    const scaleRatio = newZoom / oldZoom;

    const centerX = container.scrollLeft + container.clientWidth / 2;
    const centerY = container.scrollTop + container.clientHeight / 2;

    if (center) {
      const newScrollLeft = centerX * scaleRatio - container.clientWidth / 2;
      const newScrollTop = centerY * scaleRatio - container.clientHeight / 2;

      container.scrollLeft = newScrollLeft;
      container.scrollTop = newScrollTop;
    }

    content.style.transform = `scale(${newZoom})`;
    scale = newZoom;

    updateMeta(getZoom(), getPan(container));
    this.dispatch("onZoomChanged", { zoom: newZoom });
  }

  fitToCanvas() {
    const nodes = this.getNodes();
    if (nodes.length === 0) return;

    const bounds = nodes.reduce(
      (acc, node) => {
        const rect = node.getBoundingClientRect();
        acc.left = Math.min(acc.left, rect.left);
        acc.top = Math.min(acc.top, rect.top);
        acc.right = Math.max(acc.right, rect.right);
        acc.bottom = Math.max(acc.bottom, rect.bottom);
        return acc;
      },
      { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity }
    );

    const contentWidth = bounds.right - bounds.left;
    const contentHeight = bounds.bottom - bounds.top;

    const containerWidth = this.container.clientWidth;
    const containerHeight = this.container.clientHeight;

    const scaleX = containerWidth / contentWidth;
    const scaleY = containerHeight / contentHeight;
    const fitScale = Math.min(scaleX, scaleY, 1.0); // Cap at 100%

    this.setZoom(fitScale);
  }

  /**
   * Injects a node into the canvas.
   * @param {string} type - Node template type.
   * @param {Object} options - Optional config (label, id, x, y).
   */
  addNode(type, options = {}) {
    const node = createCanvasNode(type, options);
    this.canvasContent.appendChild(node);
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

    if (node && this.canvasContent.contains(node)) {
      this.canvasContent.removeChild(node);
      this.dispatch("onNodeRemoved", { node });
    }
  }

  /**
   * Clears all nodes from the canvas.
   */
  clearCanvas() {
    this.canvasContent.innerHTML = "";
    this.dispatch("onCanvasCleared");
  }

  /**
   * Returns all canvas nodes.
   */
  getNodes() {
    return [...this.canvasContent.querySelectorAll(".canvas__child")];
  }

  /**
   * Finds a node by its ID.
   * @param {string} id
   * @returns {HTMLElement|null}
   */
  findNodeById(id) {
    return this.canvasContent.querySelector(`#${id}`);
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
