import { registerToastDirectives } from "./toast.js";
import { resetToastState } from "./state.js";

export function registerToast(NoJS, options = {}) {
  registerToastDirectives(NoJS);
}

export function cleanupToast() {
  resetToastState();
}
