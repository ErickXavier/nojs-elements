// ─── Module-scoped Tabs coordination state ──────────────────────────
export const _tabsState = {
  containers: new Map(), // el → { tabs: [], panels: [], activeIndex: number }
};

export function resetTabsState() {
  _tabsState.containers.clear();
}
