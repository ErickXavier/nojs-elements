import { registerTreeDirective, registerBranch, registerSubtree } from "./tree.js";
import { resetTreeState } from "./state.js";

export function registerTree(NoJS, options = {}) {
  registerTreeDirective(NoJS);
  registerBranch(NoJS);
  registerSubtree(NoJS);
}

export function cleanupTree() {
  resetTreeState();
}
