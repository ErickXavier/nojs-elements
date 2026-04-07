// ══��════════════════════════════════════════���════════════════════��══════
//  NoJS Elements — CDN Entry Point
//  For <script> tag usage: sets window.NoJSElements
// ═════════════════��════════════════════════════��════════════════════════

import NoJSElements from "./index.js";

if (typeof window !== "undefined") {
  window.NoJSElements = NoJSElements;

  // Auto-install when NoJS core is already loaded
  if (window.NoJS && typeof window.NoJS.use === "function") {
    window.NoJS.use(NoJSElements);
  }
}
