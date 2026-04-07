import { registerDrag } from "./drag.js";
import { registerDrop } from "./drop.js";
import { registerDragList } from "./drag-list.js";
import { registerDragMultiple } from "./drag-multiple.js";
import { resetDndState } from "./state.js";

export function registerDnd(NoJS, options = {}) {
  registerDrag(NoJS);
  registerDrop(NoJS);
  registerDragList(NoJS);
  registerDragMultiple(NoJS);
}

export function cleanupDnd() {
  resetDndState();
}
