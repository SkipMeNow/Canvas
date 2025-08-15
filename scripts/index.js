import { CanvasEngine } from "./canvas/canvasEngine.js";

window.addEventListener("load", () => {
  const mainContainer = document.querySelector("#panel");
  const canvas = document.querySelector("#canvas");

  if (!mainContainer || !canvas) {
    console.warn("Main container or canvas not found.");
    return;
  }

  const engine = new CanvasEngine(mainContainer, canvas);
  engine.init();
});
