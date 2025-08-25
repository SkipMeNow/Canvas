let _isDragging = false;
let _startX = 0;
let _startY = 0;
let _scale = 1;

// Clamp utility
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function handleDragMouseDown(e) {
  _isDragging = true;
  _startX = e.pageX;
  _startY = e.pageY;
}

export function handleDragMouseMove(e, mainContainer) {
  if (!_isDragging) return;

  const deltaX = (_startX - e.pageX) / _scale;
  const deltaY = (_startY - e.pageY) / _scale;

  mainContainer.scrollLeft += deltaX;
  mainContainer.scrollTop += deltaY;

  _startX = e.pageX;
  _startY = e.pageY;
}

export function handleDragMouseUp() {
  _isDragging = false;
}

export function handleZoomWheel(e, canvas) {
  e.preventDefault();

  const panel = canvas.parentElement;
  const panelRect = panel.getBoundingClientRect();

  const oldScale = _scale;
  const zoomStep = 0.1;
  const delta = e.deltaY < 0 ? zoomStep : -zoomStep;
  const newScale = clamp(oldScale + delta, 0.5, 1);

  const mouseX = e.clientX - panelRect.left + panel.scrollLeft;
  const mouseY = e.clientY - panelRect.top + panel.scrollTop;

  canvas.style.transformOrigin = `${mouseX}px ${mouseY}px`;
  _scale = newScale;
  canvas.style.transform = `scale(${_scale})`;

  let newScrollLeft =
    (mouseX * newScale) / oldScale - (e.clientX - panelRect.left);
  let newScrollTop =
    (mouseY * newScale) / oldScale - (e.clientY - panelRect.top);

  const scaledWidth = canvas.offsetWidth * _scale;
  const scaledHeight = canvas.offsetHeight * _scale;

  newScrollLeft = clamp(newScrollLeft, 0, scaledWidth - panel.clientWidth);
  newScrollTop = clamp(newScrollTop, 0, scaledHeight - panel.clientHeight);

  panel.scrollLeft = newScrollLeft;
  panel.scrollTop = newScrollTop;

  if (newScale < oldScale) {
    const zoomRatio = newScale / oldScale;
    const centerX = scaledWidth / 2;
    const centerY = scaledHeight / 2;

    panel.scrollLeft = centerX - (centerX - panel.scrollLeft) * zoomRatio;
    panel.scrollTop = centerY - (centerY - panel.scrollTop) * zoomRatio;
  }
}

export function getZoom() {
  return parseFloat(_scale);
}

export function getPan(mainContainer) {
  return {
    x: mainContainer.scrollLeft,
    y: mainContainer.scrollTop,
  };
}
