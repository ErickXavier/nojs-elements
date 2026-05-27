import { registerTreeDirective, registerBranch, registerSubtree } from "./tree.js";
import { registerTreeDragMode } from "./drag.js";
import { resetTreeState } from "./state.js";

export function registerTree(NoJS, options = {}) {
  registerTreeDirective(NoJS);
  registerBranch(NoJS);
  registerSubtree(NoJS);
  registerTreeDragMode(NoJS);
}

export function cleanupTree() {
  resetTreeState();
}
