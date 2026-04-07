import { registerModalDirective } from "./modal.js";
import { registerModalOpen } from "./modal-open.js";
import { registerModalClose } from "./modal-close.js";
import { resetModalState } from "./state.js";

export function registerModal(NoJS, options = {}) {
  registerModalDirective(NoJS);
  registerModalOpen(NoJS);
  registerModalClose(NoJS);
}

export function cleanupModal() {
  resetModalState();
}
