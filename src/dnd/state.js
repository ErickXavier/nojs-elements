// ─── Module-scoped DnD coordination state ───────────���─────────────────
export const _dndState = {
  dragging: null,       // { item, type, effect, sourceEl, sourceCtx, sourceList, sourceIndex, listDirective }
  selected: new Map(),  // group → Set<{ item, el, ctx }>
  placeholder: null,    // current placeholder DOM element
};

// Keep a registry of drag-list elements for cross-list communication
export const _dragListRegistry = new Map(); // el → { listPath, ctx, el }

export function resetDndState() {
  _dndState.dragging = null;
  _dndState.selected.clear();
  _dndState.placeholder = null;
  _dragListRegistry.clear();
}
