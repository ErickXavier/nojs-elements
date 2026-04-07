import { registerPopoverDirective } from "./popover.js";
import { resetPopoverState } from "./state.js";

export function registerPopover(NoJS, options = {}) {
  registerPopoverDirective(NoJS);
}

export function cleanupPopover() {
  resetPopoverState();
}
