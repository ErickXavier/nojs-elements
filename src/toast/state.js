// ─── Module-scoped Toast coordination state ─────────────────────────

/** @type {Map<string, HTMLElement>} position → container DOM element */
export const _toastContainers = new Map();

/** @type {Set<number>} active auto-dismiss timer IDs */
export const _toastTimers = new Set();

/** @type {number} monotonic counter for unique toast IDs */
export let _toastIdCounter = 0;

export function nextToastId() {
  return ++_toastIdCounter;
}

export function resetToastState() {
  // Clear all active timers
  for (const id of _toastTimers) {
    clearTimeout(id);
  }
  _toastTimers.clear();

  // Remove auto-created containers from the DOM
  for (const container of _toastContainers.values()) {
    container.remove();
  }
  _toastContainers.clear();

  _toastIdCounter = 0;
}
