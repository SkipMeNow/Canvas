const contextMenu = document.querySelector("#contextMenu");

let isShow = false;

export function showContextMenu(x, y) {
  if (!contextMenu) return;
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
  contextMenu.style.display = "block";
  contextMenu.classList.add("show");
  isShow = true;
}

export function hideContextMenu() {
  if (!contextMenu) return;
  contextMenu.style.display = "none";
  contextMenu.classList.remove("show");
  isShow = false;
}

export function isClickOutside(target) {
  return contextMenu && !contextMenu.contains(target);
}

export function isContextMenuVisible() {
  return isShow;
}
