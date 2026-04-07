// ─── Module-scoped Dropdown coordination state ─────────────────────
export const _dropdownState = {
  openMenus: new Map(), // menuEl → { toggle, wrapper }
};

export function resetDropdownState() {
  _dropdownState.openMenus.clear();
}
