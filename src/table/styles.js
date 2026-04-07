// ─── Inject built-in Table styles (once) ────────────────────────────
export function _injectTableStyles() {
  if (typeof document === "undefined") return;
  if (document.querySelector("style[data-nojs-table]")) return;

  const css = `
.nojs-sortable th[data-sortable] {
  cursor: pointer;
  user-select: none;
}
.nojs-sortable th[data-sortable]::after {
  content: " \u21C5";
  opacity: 0.3;
}
.nojs-sortable th[data-sort-dir="asc"]::after {
  content: " \u25B2";
  opacity: 1;
}
.nojs-sortable th[data-sort-dir="desc"]::after {
  content: " \u25BC";
  opacity: 1;
}
.nojs-fixed-header thead th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #F8FAFC;
}
.nojs-fixed-col {
  position: sticky;
  left: 0;
  z-index: 1;
}
.nojs-fixed-header .nojs-fixed-col {
  z-index: 3;
}
`.trim();

  const style = document.createElement("style");
  style.setAttribute("data-nojs-table", "");
  style.textContent = css;
  document.head.appendChild(style);
}
