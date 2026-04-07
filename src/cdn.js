// ══��════════════════════════════════════════���════════════════════��══════
//  NoJS Elements — CDN Entry Point
//  For <script> tag usage: sets window.NojsElements
// ═════════════════��════════════════════════════��════════════════════════

import NojsElements from "./index.js";

if (typeof window !== "undefined") {
  window.NojsElements = NojsElements;
}
