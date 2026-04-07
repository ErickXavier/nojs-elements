// ─── Module-scoped Modal coordination state ────────────────────────

/** @type {Array<{ id: string, el: HTMLElement, triggerEl: HTMLElement | null }>} */
export const _modalStack = [];

/** @type {Map<string, HTMLElement>} modal id → element */
export const _modalRegistry = new Map();

/** Base z-index for the first modal; each stacked modal increments by 1 */
export const BASE_Z_INDEX = 10000;

export function currentZIndex() {
  return BASE_Z_INDEX + _modalStack.length;
}

export function resetModalState() {
  _modalStack.length = 0;
  _modalRegistry.clear();
}
