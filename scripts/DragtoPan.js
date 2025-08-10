export function enableDragToPan({ container, content }) {
  let isDragging = false;
  let startX, startY;
  let scale = 1;

  // Drag to pan
  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX + container.scrollLeft;
    startY = e.pageY + container.scrollTop;
    container.style.cursor = "grab";
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    container.scrollLeft = startX - e.pageX;
    container.scrollTop = startY - e.pageY;
  });

  container.addEventListener("mouseup", () => {
    isDragging = false;
    container.style.cursor = "default";
  });

  container.addEventListener("mouseleave", () => {
    isDragging = false;
    container.style.cursor = "default";
  });

  // Zoom with Ctrl + wheel
  container.addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey) {
        e.preventDefault(); // Required to override default zoom
        scale += e.deltaY * -0.001;
        scale = Math.min(Math.max(0.1, scale), 4);
        content.style.transform = `scale(${scale})`;
      }
    },
    { passive: false }
  ); // Explicitly non-passive
}
