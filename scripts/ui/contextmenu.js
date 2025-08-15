const template = document.getElementById("contextMenuTemplate");
const clone = template.content.cloneNode(true);
const contextMenu = clone.querySelector("#contextMenu");
document.body.appendChild(contextMenu);

let isShow = false;

export function showContextMenu(x, y, target) {
  if (!contextMenu) return;
  contextMenu.style.left = `${x - 10}px`;
  contextMenu.style.top = `${y - 10}px`;
  contextMenu.style.display = "block";
  contextMenu.classList.add("show");
  isShow = true;
  handleContextMenu(target);
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

function CreateLink(label, addArrow, onClick) {
  const ul = contextMenu.querySelector("ul");

  const li = document.createElement("li");
  li.textContent = label;
  // li.classList.add()

  if (addArrow) {
    const arrow = document.createElement("span");
    arrow.classList.add("arrow");
    arrow.textContent = "▶";
    li.appendChild(arrow);
  }

  ul.appendChild(li);

  li.addEventListener("click", (e) => {
    e.stopPropagation();
    onClick(e, li);
  });
}

function handleContextMenu(target) {
  const ul = contextMenu.querySelector("ul");
  ul.innerHTML = "";

  if (target.closest("#canvas-Node")) {
    CreateLink("Edit", false, (e) => {});
    CreateLink("Delete", false, (e) => {});
  } else if (target.closest("#canvas")) {
    CreateLink("Create", true, (e) => {
      
    });
  }
}
