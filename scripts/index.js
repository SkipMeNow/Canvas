import { CanvasEngine } from "./canvas/canvasEngine.js";

window.addEventListener("load", () => {
  const mainContainer = document.querySelector("#panel");
  const canvas = document.querySelector("#canvas");
  const canvasWrapper = document.querySelector(".canvas__wrapper");
  const canvasContent = document.querySelector("#canvasContent");

  if (!mainContainer || !canvas) {
    console.warn("Main container or canvas not found.");
    return;
  }

  const engine = new CanvasEngine(
    mainContainer,
    canvas,
    canvasWrapper,
    canvasContent
  );
  engine.init();
  window.FormaCanvas = engine;
});
