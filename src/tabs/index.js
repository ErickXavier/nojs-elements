import { registerTabsDirective } from "./tabs.js";
import { registerTab, registerPanel } from "./tab.js";
import { resetTabsState } from "./state.js";

export function registerTabs(NoJS, options = {}) {
  registerTabsDirective(NoJS);
  registerTab(NoJS);
  registerPanel(NoJS);
}

export function cleanupTabs() {
  resetTabsState();
}
