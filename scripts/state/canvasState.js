const canvasState = {
  nodes: {},
  connections: [],
  meta: { zoom: 1.0, pan: { x: 0, y: 0 } },
};

// Adds a new node to the canvas.
export function addNode(node) {
  canvasState.nodes[node.id] = node;
}

// Removes a node and its connections.
export function removeNode(nodeId) {
  delete canvasState.nodes[nodeId];
  canvasState.connections = canvasState.connections.filter(
    (conn) => conn.from !== nodeId && conn.to !== nodeId
  );
}

// Adds a connection between two nodes.
export function addConnection(from, to) {
  canvasState.connections.push({ from, to });
}

// Updates zoom and pan metadata.
export function updateMeta(zoom, pan) {
  canvasState.meta.zoom = zoom;
  canvasState.meta.pan = pan;
}

// Serializes the canvas state to json.
export function serializeState() {
  return JSON.stringify(canvasState);
}

// Loads canvas state from json.
export function loadState(json) {
  try {
    const parsed = JSON.parse(json);
    Object.assign(canvasState, parsed);
  } catch {
    console.error("Failed to load canvas state:", err);
  }
}
