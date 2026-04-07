// ─── Inject built-in Tooltip styles (once) ──────────────────────────
export function _injectTooltipStyles() {
  if (typeof document === "undefined") return;
  if (document.querySelector("style[data-nojs-tooltip]")) return;

  const css = `
.nojs-tooltip {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease, transform 0.15s ease;
  max-width: 18rem;
  padding: 0.45rem 0.75rem;
  background: #1E293B;
  color: #F1F5F9;
  font-size: 0.8rem;
  line-height: 1.4;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(2px);
}
.nojs-tooltip[aria-hidden="false"] {
  opacity: 1;
  transform: translateY(0);
}
`.trim();

  const style = document.createElement("style");
  style.setAttribute("data-nojs-tooltip", "");
  style.textContent = css;
  document.head.appendChild(style);
}
