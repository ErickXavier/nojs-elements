// ─── Module-scoped Tooltip coordination state ───────────────────────

// Registry of active tooltip elements { triggerEl → tooltipEl }
export const _tooltipRegistry = new Map();

// Active tooltip show timeouts { triggerEl → timeoutId }
export const _tooltipTimeouts = new Map();

export function resetTooltipState() {
  // Clear all tooltip timeouts
  for (const timeoutId of _tooltipTimeouts.values()) {
    clearTimeout(timeoutId);
  }
  _tooltipTimeouts.clear();

  // Remove tooltip elements from DOM
  for (const tooltipEl of _tooltipRegistry.values()) {
    tooltipEl.remove();
  }
  _tooltipRegistry.clear();
}
