export class InputHandler {
  constructor(onInputChange, options = {}) {
    this.onInputChange = onInputChange;
    this.onHoverChange = options.onHoverChange || null;
    this.onMouseEvent = options.onMouseEvent || null;
    this.onDragChange = options.onDragChange || null;
    this.onZoomChange = options.onZoomChange || null;
    this.onContextMenuChange = options.onContextMenuChange || null;

    this.inputDragState = {
      canDrag: false,
      isDragging: false,
      pressStartTime: null,
      dragThreshold: 100, // ms
      mouseDownTarget: null,
    };

    this.isContextMenuOpen = false;

    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("mousedown", (e) => this.handleMouseDown(e));
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    document.addEventListener("mouseup", (e) => this.handleMouseUp(e));
    document.addEventListener("mouseleave", (e) => this.handleMouseLeave(e));
    document.addEventListener("keydown", (e) => this.handleKeyDown(e));
    document.addEventListener("keyup", (e) => this.handleKeyUp(e));
    document.addEventListener(
      "wheel",
      (e) => {
        this.handleWheel(e);
      },
      { passive: false }
    );
    document.addEventListener("contextmenu", (e) => this.handleContextMenu(e));
  }

  setCursor(type) {
    document.body.style.cursor = type;
  }

  handleMouseDown(e) {
    if (e.button === 1) {
      e.preventDefault();
    }

    this.inputDragState.pressStartTime = Date.now();
    this.inputDragState.mouseDownTarget = e.target;
    this.inputDragState.canDrag = false;
    this.onMouseEvent?.("mousedown", e);
  }

  handleMouseMove(e) {
    e.preventDefault();
    const isMiddlePressed = (e.buttons & 4) !== 0;

    if (this.inputDragState.pressStartTime) {
      const duration = Date.now() - this.inputDragState.pressStartTime;
      if (
        duration > this.inputDragState.dragThreshold &&
        !this.inputDragState.canDrag &&
        isMiddlePressed
      ) {
        this.inputDragState.canDrag = true;
        this.setCursor("grab");
        this.onDragChange?.(this.inputDragState, e);
        this.inputDragState.isDragging = true;
      } else if (this.inputDragState.isDragging) {
        this.onDragChange?.(this.inputDragState, e);
      }
    }

    this.onMouseEvent?.("mousemove", e);
  }

  handleMouseUp(e) {
    const duration = Date.now() - (this.inputDragState.pressStartTime || 0);

    if (duration < this.inputDragState.dragThreshold) {
      // Click detected
      this.onMouseEvent?.("click", e);
    } else if (this.inputDragState.canDrag) {
      // Drag ended
      this.inputDragState.canDrag = false;
      this.inputDragState.isDragging = false;
      this.setCursor("default");
      this.onDragChange?.(this.inputDragState, e);
    }

    this.inputDragState.pressStartTime = null;
    this.inputDragState.canDrag = false;
    this.inputDragState.mouseDownTarget = null;

    this.onMouseEvent?.("mouseup", e);
  }

  handleMouseLeave(e) {
    if (this.inputDragState.canDrag) {
      this.inputDragState.canDrag = false;
      this.inputDragState.isDragging = false;
      this.onDragChange?.(this.inputDragState, e);
    }

    this.inputDragState.pressStartTime = null;
    this.inputDragState.canDrag = false;

    this.onMouseEvent?.("mouseleave", e);
  }

  handleKeyDown(e) {
    this.onMouseEvent?.("keydown", e);
  }

  handleKeyUp(e) {
    this.onMouseEvent?.("keyup", e);
  }

  handleWheel(e) {
    if (e.ctrlKey) {
      e.preventDefault();
      this.onZoomChange?.(e);
    }
  }

  handleContextMenu(e) {
    e.preventDefault();
    if (!e.target.closest("#canvas, #canvas-Node")) return;
    this.isContextMenuOpen = true;
    this.onContextMenuChange?.(true, e);
  }
}
