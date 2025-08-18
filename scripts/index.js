import { CanvasEngine } from "./canvas/canvasEngine.js";

window.addEventListener("load", () => {
  const mainContainer = document.querySelector("#panel");
  const canvas = document.querySelector("#canvas");
  const canvasContent = document.querySelector("#canvasContent");
  const viewport = document.getElementById("canvasViewport");

  if (!mainContainer || !canvas) {
    console.warn("Main container or canvas not found.");
    return;
  }

  const engine = new CanvasEngine(
    mainContainer,
    canvas,
    viewport,
    canvasContent
  );
  engine.init();
  window.FormaCanvas = engine;
});
