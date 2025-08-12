export class InputHandler {
  constructor(elements, onInputChange) {
    this.elements = elements;
    this.onInputChange = onInputChange;

    this.inputState = {
      hoverTarget: null,
      activeTarget: null,
      actionKey: null,
      keys: new Set(),
      dragging: false,
      mousePosition: { x: 0, y: 0 },
      eventType: null,
      eventTarget: null,
      eventTimestamp: null,
      eventRef: null,
      button: null,
      buttons: null,
      key: null,
      code: null,
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      metaKey: false,
      lastInputType: null,
    };

    this.bindEvents();
  }

  bindEvents() {
    const { mainContainer } = this.elements;
    if (!mainContainer) return;

    // 🖱️ Mouse down = start drag
    mainContainer.addEventListener("mousedown", (e) => {
      this.inputState.dragging = true;
      this.inputState.actionKey = "mousedown";
      this.inputState.activeTarget = e.target;
      mainContainer.style.cursor = "grab";
      this.updateInput(e);
    });

    // 🖱️ Mouse move = update position + hover target
    mainContainer.addEventListener("mousemove", (e) => {
      this.inputState.mousePosition = { x: e.pageX, y: e.pageY };
      this.inputState.hoverTarget = document.elementFromPoint(e.pageX, e.pageY);
      this.updateInput(e);
    });

    // 🖱️ Mouse up = end drag
    mainContainer.addEventListener("mouseup", (e) => {
      this.inputState.dragging = false;
      this.inputState.actionKey = "mouseup";
      this.inputState.activeTarget = e.target;
      mainContainer.style.cursor = "default";
      this.updateInput(e);
    });

    // 🖱️ Mouse leave = cancel drag
    mainContainer.addEventListener("mouseleave", (e) => {
      this.inputState.actionKey = "mouseleave";
      this.inputState.activeTarget = e.target;
      mainContainer.style.cursor = "default";
      this.updateInput(e);
    });

    // ⌨️ Key tracking
    document.addEventListener("keydown", (e) => {
      this.inputState.keys.add(e.key);
      this.inputState.actionKey = "keydown";
      this.updateInput(e);
    });

    document.addEventListener("keyup", (e) => {
      this.inputState.keys.delete(e.key);
      this.inputState.actionKey = "keyup";
      this.updateInput(e);
    });
  }

  updateInput(e) {
    const isMouseEvent = e instanceof MouseEvent;
    const isKeyboardEvent = e instanceof KeyboardEvent;
    const isPointerEvent = e instanceof PointerEvent;

    // General event metadata
    this.inputState.eventType = e.type;
    this.inputState.eventTarget = e.target;
    this.inputState.eventTimestamp = e.timeStamp;
    this.inputState.eventRef = e;

    // Input source
    this.inputState.lastInputType = isMouseEvent
      ? "mouse"
      : isKeyboardEvent
      ? "keyboard"
      : isPointerEvent
      ? "pointer"
      : "unknown";

    // Mouse & Pointer data
    if (isMouseEvent || isPointerEvent) {
      this.inputState.mousePosition = {
        x: e.pageX,
        y: e.pageY,
      };
      this.inputState.hoverTarget = document.elementFromPoint(e.pageX, e.pageY);
      this.inputState.button = e.button;
      this.inputState.buttons = e.buttons;
      this.inputState.ctrlKey = e.ctrlKey;
      this.inputState.shiftKey = e.shiftKey;
      this.inputState.altKey = e.altKey;
      this.inputState.metaKey = e.metaKey;
    }

    // Keyboard data
    if (isKeyboardEvent) {
      this.inputState.key = e.key;
      this.inputState.code = e.code;
      this.inputState.ctrlKey = e.ctrlKey;
      this.inputState.shiftKey = e.shiftKey;
      this.inputState.altKey = e.altKey;
      this.inputState.metaKey = e.metaKey;
    }

    // Dispatch to callback
    if (this.onInputChange) {
      this.onInputChange({ ...this.inputState }, e);
    }
  }
}
