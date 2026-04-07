import { registerTooltip } from "./tooltip.js";
import { resetTooltipState } from "./state.js";

export function registerTooltipModule(NoJS, options = {}) {
  registerTooltip(NoJS);
}

export function cleanupTooltip() {
  resetTooltipState();
}
