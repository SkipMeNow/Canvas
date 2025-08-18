/**
 * Converts page coordinates to local coordinates relative to a target element.
 * @param {number} pageX - Mouse X position (from event.pageX)
 * @param {number} pageY - Mouse Y position (from event.pageY)
 * @param {HTMLElement} target - The element to position inside
 * @returns {{ x: number, y: number }} - Local coordinates
 */
export function getLocalCoords(clientX, clientY, container, scale = 1) {
  if (!(container instanceof Element)) {
    throw new TypeError("getLocalCoords: container must be a DOM Element");
  }

  const rect = container.getBoundingClientRect();
  const x = (clientX - rect.left + container.scrollLeft) / scale;
  const y = (clientY - rect.top + container.scrollTop) / scale;
  return { x, y };
}
