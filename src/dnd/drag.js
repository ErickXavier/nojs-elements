import { _dndState } from "./state.js";
import { _injectDndStyles } from "./styles.js";
import { _buildStackGhost, _removePlaceholder } from "./helpers.js";

export function registerDrag(NoJS) {
  NoJS.directive("drag", {
    priority: 15,
    init(el, name, expr) {
      _injectDndStyles();
      const ctx = NoJS.findContext(el);

      const type = el.getAttribute("drag-type") || "default";
      const effect = el.getAttribute("drag-effect") || "move";
      const handleSel = el.getAttribute("drag-handle");
      const imageSel = el.getAttribute("drag-image");
      const imageOffsetAttr = el.getAttribute("drag-image-offset") || "0,0";
      const disabledExpr = el.getAttribute("drag-disabled");
      const dragClass = el.getAttribute("drag-class") || "nojs-dragging";
      const ghostClass = el.getAttribute("drag-ghost-class");

      // Set draggable
      el.draggable = true;

      // Accessibility
      el.setAttribute("aria-grabbed", "false");
      if (!el.getAttribute("tabindex")) el.setAttribute("tabindex", "0");

      // Handle restriction: prevent drag from non-handle areas
      let _handleAllowed = true;
      if (handleSel) {
        const mousedownHandler = (e) => {
          _handleAllowed = !!e.target.closest(handleSel);
        };
        el.addEventListener("mousedown", mousedownHandler);
        NoJS._onDispose(() => el.removeEventListener("mousedown", mousedownHandler));
      }

      // Drag start
      const dragstartHandler = (e) => {
        // Handle check
        if (handleSel && !_handleAllowed) {
          e.preventDefault();
          return;
        }

        // Disabled check
        if (disabledExpr && NoJS.evaluate(disabledExpr, ctx)) {
          e.preventDefault();
          return;
        }

        const item = NoJS.evaluate(expr, ctx);

        // Check for multi-select
        const group = el.getAttribute("drag-group");
        let dragItem = item;
        if (group && _dndState.selected.has(group)) {
          const selectedSet = _dndState.selected.get(group);
          if (selectedSet.size > 0) {
            // If this element is selected, drag all selected items
            const hasThis = [...selectedSet].some((s) => s.el === el);
            if (hasThis) {
              dragItem = [...selectedSet].map((s) => s.item);
            }
          }
        }

        // Store dragging state
        _dndState.dragging = {
          item: dragItem,
          type,
          effect,
          sourceEl: el,
          sourceCtx: ctx,
          sourceList: null,
          sourceIndex: null,
          listDirective: null,
        };

        // Set dataTransfer
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = effect;
          e.dataTransfer.setData("text/plain", "");

          // Multi-select: stacked cards drag image
          if (Array.isArray(dragItem) && dragItem.length > 1 && e.dataTransfer.setDragImage) {
            const ghost = _buildStackGhost(el, dragItem.length);
            document.body.appendChild(ghost);
            const rect = el.getBoundingClientRect();
            e.dataTransfer.setDragImage(ghost, rect.width / 2, rect.height / 2);
            requestAnimationFrame(() => ghost.remove());
          } else if (imageSel && e.dataTransfer.setDragImage) {
            // Custom drag image
            if (imageSel === "none") {
              const empty = document.createElement("div");
              empty.style.cssText = "width:1px;height:1px;opacity:0;position:fixed;top:-999px";
              document.body.appendChild(empty);
              const [ox, oy] = imageOffsetAttr.split(",").map(Number);
              e.dataTransfer.setDragImage(empty, ox || 0, oy || 0);
              requestAnimationFrame(() => empty.remove());
            } else {
              const imgEl = el.querySelector(imageSel);
              if (imgEl) {
                const [ox, oy] = imageOffsetAttr.split(",").map(Number);
                if (ghostClass) imgEl.classList.add(ghostClass);
                e.dataTransfer.setDragImage(imgEl, ox || 0, oy || 0);
              }
            }
          }
        }

        // Apply drag class to dragged element (and all selected items if multi-select)
        dragClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
        if (Array.isArray(dragItem) && group && _dndState.selected.has(group)) {
          for (const s of _dndState.selected.get(group)) {
            if (s.el !== el) dragClass.split(/\s+/).filter(Boolean).forEach((c) => s.el.classList.add(c));
          }
        }

        // ARIA
        el.setAttribute("aria-grabbed", "true");

        // Dispatch custom event
        el.dispatchEvent(
          new CustomEvent("drag-start", {
            bubbles: true,
            detail: { item: dragItem, index: _dndState.dragging.sourceIndex, el },
          })
        );
      };

      // Drag end
      const dragendHandler = () => {
        // Remove drag class from this element and all selected items
        dragClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
        const group = el.getAttribute("drag-group");
        if (group && _dndState.selected.has(group)) {
          for (const s of _dndState.selected.get(group)) {
            dragClass.split(/\s+/).filter(Boolean).forEach((c) => s.el.classList.remove(c));
          }
        }

        // ARIA
        el.setAttribute("aria-grabbed", "false");

        // Ghost class cleanup
        if (ghostClass && imageSel && imageSel !== "none") {
          const imgEl = el.querySelector(imageSel);
          if (imgEl) imgEl.classList.remove(ghostClass);
        }

        // Dispatch custom event
        el.dispatchEvent(
          new CustomEvent("drag-end", {
            bubbles: true,
            detail: {
              item: _dndState.dragging?.item,
              index: _dndState.dragging?.sourceIndex,
              dropped: _dndState.dragging === null,
            },
          })
        );

        // Clear dragging state
        _dndState.dragging = null;
        _removePlaceholder();
      };

      el.addEventListener("dragstart", dragstartHandler);
      el.addEventListener("dragend", dragendHandler);
      NoJS._onDispose(() => {
        el.removeEventListener("dragstart", dragstartHandler);
        el.removeEventListener("dragend", dragendHandler);
      });

      // Reactive disabled toggle
      if (disabledExpr) {
        function updateDisabled() {
          const disabled = !!NoJS.evaluate(disabledExpr, ctx);
          el.draggable = !disabled;
          if (disabled) el.removeAttribute("aria-grabbed");
          else el.setAttribute("aria-grabbed", "false");
        }
        const unwatchDisabled = ctx.$watch(updateDisabled);
        NoJS._onDispose(unwatchDisabled);
      }

      // Keyboard DnD support
      const keydownHandler = (e) => {
        // Clear stale state from elements removed from DOM
        if (_dndState.dragging && !_dndState.dragging.sourceEl.isConnected) {
          _dndState.dragging = null;
        }
        if (e.key === " " && !_dndState.dragging) {
          e.preventDefault();
          const item = NoJS.evaluate(expr, ctx);
          _dndState.dragging = {
            item,
            type,
            effect,
            sourceEl: el,
            sourceCtx: ctx,
            sourceList: null,
            sourceIndex: null,
            listDirective: null,
          };
          dragClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
          el.setAttribute("aria-grabbed", "true");
          el.dispatchEvent(
            new CustomEvent("drag-start", {
              bubbles: true,
              detail: { item, index: null, el },
            })
          );
        } else if (e.key === "Escape" && _dndState.dragging && _dndState.dragging.sourceEl === el) {
          e.preventDefault();
          dragClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
          el.setAttribute("aria-grabbed", "false");
          _dndState.dragging = null;
          _removePlaceholder();
        }
      };
      el.addEventListener("keydown", keydownHandler);
      NoJS._onDispose(() => el.removeEventListener("keydown", keydownHandler));
    },
  });
}
