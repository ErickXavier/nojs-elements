// ─── Module-scoped Tree coordination state ──────────────────────────
export const _treeState = {
  branches: new Map(), // el → { expanded, subtreeEl }
  selectedItem: null,  // currently selected treeitem element
  typeahead: "",       // current typeahead buffer
  typeaheadTimer: null, // reset timer
};

export function resetTreeState() {
  _treeState.branches.clear();
  _treeState.selectedItem = null;
  _treeState.typeahead = "";
  if (_treeState.typeaheadTimer) {
    clearTimeout(_treeState.typeaheadTimer);
    _treeState.typeaheadTimer = null;
  }
}
