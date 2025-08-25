import { CanvasEngine } from "./canvas/canvasEngine.js";

let resizeTimeout;

export function resizeCanvas(canvas) {
  const extra = 100;
  canvas.style.width = `${window.innerWidth + extra}px`;
  canvas.style.height = `${window.innerHeight + extra}px`;
}

window.addEventListener("load", () => {
  const mainContainer = document.querySelector("#panel");
  const canvas = document.querySelector("#canvas");
  const viewport = document.querySelector(".canvas__viewport");

  if (!mainContainer || !canvas || !viewport) {
    console.warn("Main container, canvas, or viewport not found.");
    return;
  }

  resizeCanvas(canvas);

  const engine = new CanvasEngine(mainContainer, canvas, viewport);
  engine.init();

  window.FormaCanvas = engine;
});

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    resizeCanvas(document.querySelector("#canvas"));
  }, 100);
});
