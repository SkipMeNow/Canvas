import { getZoom } from "../input/dragtopan.js";

const template = document.getElementById("contextMenuTemplate");
const clone = template.content.cloneNode(true);
const contextMenu = clone.querySelector("#contextMenu");
document.body.appendChild(contextMenu);

let isShow = false;

export function showContextMenu(x, y, target, engine) {
  if (!contextMenu) return;

  contextMenu.style.left = `${x - 10}px`;
  contextMenu.style.top = `${y - 10}px`;
  contextMenu.style.display = "block";
  contextMenu.classList.add("show");
  isShow = true;

  handleContextMenu(target, engine, x - 10, y - 10); // Pass raw numbers
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
  li.setAttribute("data-action", label.toLowerCase());

  if (addArrow) {
    const arrow = document.createElement("span");
    arrow.classList.add("context-menu__arrow");
    arrow.textContent = "▶";
    li.appendChild(arrow);
  }

  ul.appendChild(li);

  li.addEventListener("click", (e) => {
    e.stopPropagation();
    onClick(e, li);
    hideContextMenu();
  });
}

function handleContextMenu(target, engine, x, y) {
  const ul = contextMenu.querySelector("ul");
  ul.innerHTML = "";

  const isNode = target.closest(".canvas__child");
  const isCanvas = target.closest("#canvas");

  if (isNode) {
    CreateLink("Edit", false, (e) => {
      console.log("Edit node");
    });

    CreateLink("Delete", false, (e) => {
      const node = target.closest(".canvas__child");
      if (node) engine.removeNode?.(node);
    });
  } else if (isCanvas) {
    CreateLink("Create", true, (e) => {
      engine.addNode("base", {
        label: "New Node",
        x: parseInt(x) + 20,
        y: parseInt(y) + 20,
        zoomLevel: getZoom(),
      });
    });
  }
}
