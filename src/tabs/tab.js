// ─── Tab and Panel directives ────────────────────────────────────────
// These are lightweight markers. The heavy lifting happens in tabs.js
// which collects [tab] and [panel] children during init. These
// directives exist so NoJS recognizes the attributes and does not warn
// about unknown directives. They also serve as an extension point for
// future per-tab reactive behavior (e.g. tab-disabled re-evaluation).

export function registerTab(NoJS) {
  NoJS.directive("tab", {
    priority: 11,
    init() {
      // Handled by the parent [tabs] directive
    },
  });

  NoJS.directive("tab-disabled", {
    priority: 11,
    init() {
      // Evaluated by the parent [tabs] directive
    },
  });

  NoJS.directive("tab-position", {
    priority: 11,
    init() {
      // Read by the parent [tabs] directive
    },
  });
}

export function registerPanel(NoJS) {
  NoJS.directive("panel", {
    priority: 11,
    init() {
      // Handled by the parent [tabs] directive
    },
  });
}
