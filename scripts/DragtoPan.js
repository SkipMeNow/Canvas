let isDragging = false;
let startX = 0;
let startY = 0;
let scale = 1;

export function handleDragMouseDown(e, mainContainer) {
  isDragging = true;
  startX = e.pageX + mainContainer.scrollLeft;
  startY = e.pageY + mainContainer.scrollTop;
  // mainContainer.style.cursor = "grab";
}

export function handleDragMouseMove(e, mainContainer) {
  if (!isDragging) return;
  mainContainer.scrollLeft = startX - e.pageX;
  mainContainer.scrollTop = startY - e.pageY;
}

export function handleDragMouseUp(mainContainer) {
  isDragging = false;
  // mainContainer.style.cursor = "default";
}

export function handleDragMouseLeave(mainContainer) {
  isDragging = false;
  // mainContainer.style.cursor = "default";
}

export function handleZoomWheel(e, content) {
  if (!content) {
    console.warn("handleWheel: content element not found.");
    return;
  }

  scale += e.deltaY * -0.001;
  scale = Math.min(Math.max(0.1, scale), 4);
  content.style.transform = `scale(${scale})`;
}
