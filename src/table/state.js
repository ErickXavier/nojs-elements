// ─── Module-scoped table sort state ─────────────────────────────────
export const _tableState = {
  sorts: new Map(), // table el -> { column: string|null, direction: 'asc'|'desc'|null }
};

export function resetTableState() {
  _tableState.sorts.clear();
}
