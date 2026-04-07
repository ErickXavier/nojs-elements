import { registerSplitDirective } from "./split.js";
import { registerPane } from "./pane.js";
import { resetSplitState } from "./state.js";

export function registerSplit(NoJS, options = {}) {
  registerSplitDirective(NoJS);
  registerPane(NoJS);
}

export function cleanupSplit() {
  resetSplitState();
}
