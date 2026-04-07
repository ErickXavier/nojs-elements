// ─── Module-scoped Popover coordination state ──────────────────────

// Registry of active popover elements { id → { popoverEl, triggerEls, position, open } }
export const _popoverRegistry = new Map();

export function resetPopoverState() {
  _popoverRegistry.clear();
}
