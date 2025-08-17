let isDragging = false;
let startX = 0;
let startY = 0;
let scale = 1;

export function handleDragMouseDown(e, mainContainer) {
  isDragging = true;
  startX = e.pageX + mainContainer.scrollLeft;
  startY = e.pageY + mainContainer.scrollTop;
}

export function handleDragMouseMove(e, mainContainer) {
  if (!isDragging) return;
  mainContainer.scrollLeft = startX - e.pageX;
  mainContainer.scrollTop = startY - e.pageY;
}

export function handleDragMouseUp() {
  isDragging = false;
}

export function handleZoomWheel(e, content) {
  e.preventDefault();

  const container = content.parentElement;
  const containerRect = container.getBoundingClientRect();

  const oldScale = scale;
  const zoomStep = 0.1;
  const delta = e.deltaY < 0 ? zoomStep : -zoomStep;
  const newScale = Math.min(Math.max(0.1, oldScale + delta), 4);
  const scaleRatio = newScale / oldScale;

  // Mouse position relative to content's unscaled coordinate space
  const mouseX =
    (e.clientX - containerRect.left + container.scrollLeft) / oldScale;
  const mouseY =
    (e.clientY - containerRect.top + container.scrollTop) / oldScale;

  // Apply new scale
  scale = newScale;
  content.style.transform = `scale(${scale})`;

  // Adjust scroll to keep mouse position fixed
  const newScrollLeft = mouseX * scale - (e.clientX - containerRect.left);
  const newScrollTop = mouseY * scale - (e.clientY - containerRect.top);

  container.scrollLeft = newScrollLeft;
  container.scrollTop = newScrollTop;
}

export function getZoom() {
  return scale;
}

export function getPan(mainContainer) {
  return { x: mainContainer.scrollLeft, y: mainContainer.scrollTop };
}
