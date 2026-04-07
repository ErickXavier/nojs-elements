import { registerSortable, registerSort, registerFixedHeader, registerFixedCol } from "./table.js";
import { resetTableState } from "./state.js";

export function registerTable(NoJS, options = {}) {
  registerSortable(NoJS);
  registerSort(NoJS);
  registerFixedHeader(NoJS);
  registerFixedCol(NoJS);
}

export function cleanupTable() {
  resetTableState();
}
