/**
 * Converts page coordinates to local coordinates relative to a target element.
 * @param {number} pageX - Mouse X position (from event.pageX)
 * @param {number} pageY - Mouse Y position (from event.pageY)
 * @param {HTMLElement} target - The element to position inside
 * @returns {{ x: number, y: number }} - Local coordinates
 */
export function getLocalCoords(pageX, pageY, target) {
  if (!target || typeof pageX !== "number" || typeof pageY !== "number") {
    console.warn("Invalid input to getLocalCoords");
    return { x: 0, y: 0 };
  }

  const rect = target.getBoundingClientRect();
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const localX = pageX - (rect.left + scrollX);
  const localY = pageY - (rect.top + scrollY);

  return { x: localX, y: localY };
}
