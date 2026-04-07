// ─── Inject built-in Modal styles (once) ────────────────────────────
export function _injectModalStyles() {
  if (typeof document === "undefined") return;
  if (document.querySelector("style[data-nojs-modal]")) return;

  const css = `
.nojs-modal {
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  margin: 0;
  border: none;
  padding: 0;
  max-width: 100dvw;
  max-height: 100dvh;
  background: transparent;
}
.nojs-modal:popover-open {
  display: flex !important;
  inset: 0 !important;
  margin: 0 !important;
  width: 100dvw !important;
  height: 100dvh !important;
}
.nojs-modal::backdrop {
  background: rgb(0 0 0 / 0.5);
}
.nojs-modal[data-nojs-no-backdrop]::backdrop {
  background: transparent;
}
`.trim();

  const style = document.createElement("style");
  style.setAttribute("data-nojs-modal", "");
  style.textContent = css;
  document.head.appendChild(style);
}
