const contextMenu = document.querySelector("#contextMenu");

export function handleContextMenu(canvas) {
  if (!canvas || !contextMenu) return;

  canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    contextMenu.style.left = `${e.pageX}px`;
    contextMenu.style.top = `${e.pageY}px`;
    contextMenu.style.display = "block";
    contextMenu.classList.add("show");
  });

  document.addEventListener("click", (e) => {
    if (!contextMenu.contains(e.target)) {
      contextMenu.style.display = "none";
      contextMenu.classList.remove("show");
    }
  });
}
