import { getLocalCoords } from "../utils/position.js";

// Finds and clones a cnavs node template by type
export function createCanvasNode(
  type,
  options = {
    x,
    y,
    zoomLevel,
    label: "New Node",
    id: "node-123",
    classes: ["highlighted", "draggable"],
    animateIn: true,
    contextMenu: true,
  }
) {
  const template = document.querySelector(`template[data-type="${type}"]`);

  if (!template) {
    throw new Error(
      `Canvas node template with type "${type}" not found. Check your <template data-type="${type}"> in HTML.`
    );
  }

  const clone = template.content.cloneNode(true);
  const root = clone.querySelector(".canvas__child");

  if (options.label) {
    const heading = root.querySelector("h2");
    if (heading) heading.textContent = options.label;
  }

  if (options.id) {
    root.id = options.id;
  }

  if (options.classes) {
    root.classList.add(...options.classes);
  }

  // console.log("Raw mouse coords:", options.x, options.y);

  // Positioning
  if (options.x !== undefined && options.y !== undefined) {
    const canvasContent = document.querySelector("#canvasViewport");
    const { x, y } = getLocalCoords(
      options.x,
      options.y,
      canvasContent,
      options?.zoomLevel
    );

    root.style.position = "absolute";
    root.style.left = `${x}px`;
    root.style.top = `${y}px`;
  } else {
    root.style.position = "absolute";
    root.style.left = "100px";
    root.style.top = "100px";
  }

  return clone;
}

/**
 * Injects a canvas node into the canvas container.
 * @param {string} type - Node type.
 * @param {Object} options - Optional config.
 * @param {HTMLElement} target - Target container (default: #canvas .canvas__content).
 */
export function injectCanvasNode(type, options = {}, target = null) {
  const node = createCanvasNode(type, options);
  const container =
    target || document.querySelector("#canvas .canvas__content");
  if (!container) throw new Error("Canvas container not found");
  container.appendChild(node);
}
