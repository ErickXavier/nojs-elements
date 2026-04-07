import { _dndState } from "./state.js";

export function registerDragMultiple(NoJS) {
  NoJS.directive("drag-multiple", {
    priority: 16,
    init(el, name) {
      const ctx = NoJS.findContext(el);
      const group = el.getAttribute("drag-group");
      const selectClass = el.getAttribute("drag-multiple-class") || "nojs-selected";

      if (!group) {
        NoJS._warn("drag-multiple requires drag-group attribute");
        return;
      }

      // Initialize group set if needed
      if (!_dndState.selected.has(group)) {
        _dndState.selected.set(group, new Set());
      }
      const selectedSet = _dndState.selected.get(group);

      const clickHandler = (e) => {
        const dragExpr = el.getAttribute("drag");
        const item = dragExpr ? NoJS.evaluate(dragExpr, ctx) : null;
        const entry = { item, el, ctx };

        if (e.ctrlKey || e.metaKey) {
          // Additive selection
          const existing = [...selectedSet].find((s) => s.el === el);
          if (existing) {
            selectedSet.delete(existing);
            selectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
          } else {
            selectedSet.add(entry);
            selectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
          }
        } else {
          // Replace selection
          for (const s of selectedSet) {
            selectClass.split(/\s+/).filter(Boolean).forEach((c) => s.el.classList.remove(c));
          }
          selectedSet.clear();
          selectedSet.add(entry);
          selectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
        }
      };

      el.addEventListener("click", clickHandler);
      NoJS._onDispose(() => {
        el.removeEventListener("click", clickHandler);
        // Remove this element from the selection set
        const existing = [...selectedSet].find((s) => s.el === el);
        if (existing) selectedSet.delete(existing);
      });

      // Escape clears selection for this group
      const escHandler = (e) => {
        if (e.key === "Escape") {
          for (const s of selectedSet) {
            selectClass.split(/\s+/).filter(Boolean).forEach((c) => s.el.classList.remove(c));
          }
          selectedSet.clear();
        }
      };
      window.addEventListener("keydown", escHandler);
      NoJS._onDispose(() => window.removeEventListener("keydown", escHandler));
    },
  });
}
