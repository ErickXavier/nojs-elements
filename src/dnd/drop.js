import { _dndState } from "./state.js";
import { _injectDndStyles } from "./styles.js";
import {
  _calcDropIndex,
  _insertPlaceholder,
  _removePlaceholder,
  _isTypeAccepted,
  _countVisibleChildren,
} from "./helpers.js";

export function registerDrop(NoJS) {
  NoJS.directive("drop", {
    priority: 15,
    init(el, name, expr) {
      _injectDndStyles();
      const ctx = NoJS.findContext(el);

      const acceptAttr = el.getAttribute("drop-accept") || "default";
      const dropEffect = el.getAttribute("drop-effect") || "move";
      const dropClass = el.getAttribute("drop-class") || "nojs-drag-over";
      const rejectClass = el.getAttribute("drop-reject-class") || "nojs-drop-reject";
      const disabledExpr = el.getAttribute("drop-disabled");
      const maxExpr = el.getAttribute("drop-max");
      const sortDir = el.getAttribute("drop-sort");
      const placeholderAttr = el.getAttribute("drop-placeholder");
      const placeholderClass = el.getAttribute("drop-placeholder-class");

      // Accessibility
      el.setAttribute("aria-dropeffect", dropEffect);

      // Track dragenter/dragleave depth for nested elements
      let _enterDepth = 0;

      const dragoverHandler = (e) => {
        if (!_dndState.dragging) return;

        // Disabled check
        if (disabledExpr && NoJS.evaluate(disabledExpr, ctx)) return;

        const typeOk = _isTypeAccepted(_dndState.dragging.type, acceptAttr);
        let maxOk = true;
        if (maxExpr) {
          const max = NoJS.evaluate(maxExpr, ctx);
          const childCount = _countVisibleChildren(el);
          if (typeof max === "number" && childCount >= max) maxOk = false;
        }

        if (!typeOk || !maxOk) {
          rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
          dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
          _removePlaceholder();
          return;
        }

        rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));

        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = dropEffect;

        // Sortable: calculate index and show placeholder
        if (sortDir) {
          const idx = _calcDropIndex(el, e.clientX, e.clientY, sortDir);
          if (placeholderAttr) {
            _insertPlaceholder(el, idx, placeholderAttr, placeholderClass);
          }
          // Dispatch throttled drag-over event
          el.dispatchEvent(
            new CustomEvent("drag-over", {
              bubbles: false,
              detail: { item: _dndState.dragging.item, index: idx },
            })
          );
        }
      };

      const dragenterHandler = (e) => {
        if (!_dndState.dragging) return;
        if (disabledExpr && NoJS.evaluate(disabledExpr, ctx)) return;

        _enterDepth++;
        if (_enterDepth === 1) {
          const typeOk = _isTypeAccepted(_dndState.dragging.type, acceptAttr);
          let maxOk = true;
          if (maxExpr) {
            const max = NoJS.evaluate(maxExpr, ctx);
            const childCount = _countVisibleChildren(el);
            if (typeof max === "number" && childCount >= max) maxOk = false;
          }

          if (typeOk && maxOk) {
            dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
            el.dispatchEvent(
              new CustomEvent("drag-enter", {
                bubbles: false,
                detail: { item: _dndState.dragging.item, type: _dndState.dragging.type },
              })
            );
          } else {
            rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
          }
        }
      };

      const dragleaveHandler = (e) => {
        if (!_dndState.dragging) return;

        _enterDepth--;
        if (_enterDepth <= 0) {
          _enterDepth = 0;
          dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
          rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
          _removePlaceholder();

          el.dispatchEvent(
            new CustomEvent("drag-leave", {
              bubbles: false,
              detail: { item: _dndState.dragging.item },
            })
          );
        }
      };

      const dropHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        _enterDepth = 0;

        if (!_dndState.dragging) return;
        if (disabledExpr && NoJS.evaluate(disabledExpr, ctx)) return;
        if (!_isTypeAccepted(_dndState.dragging.type, acceptAttr)) return;

        // Max capacity check
        if (maxExpr) {
          const max = NoJS.evaluate(maxExpr, ctx);
          const childCount = _countVisibleChildren(el);
          if (typeof max === "number" && childCount >= max) return;
        }

        const dragItem = _dndState.dragging.item;
        const dragType = _dndState.dragging.type;
        const dragEffect = _dndState.dragging.effect;

        // Calculate drop index
        let dropIndex = 0;
        if (sortDir) {
          dropIndex = _calcDropIndex(el, e.clientX, e.clientY, sortDir);
        }

        // Remove visual feedback
        dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
        rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
        _removePlaceholder();

        // Execute drop expression with implicit variables
        const extraVars = {
          $drag: dragItem,
          $dragType: dragType,
          $dragEffect: dragEffect,
          $dropIndex: dropIndex,
          $source: {
            list: _dndState.dragging.sourceList,
            index: _dndState.dragging.sourceIndex,
            el: _dndState.dragging.sourceEl,
          },
          $target: { list: null, index: dropIndex, el },
          $el: el,
        };

        NoJS._execStatement(expr, ctx, extraVars);

        // Clear dragging state BEFORE dispatch to prevent re-entry
        _dndState.dragging = null;

        // Dispatch custom event after expression runs
        el.dispatchEvent(
          new CustomEvent("drop", {
            bubbles: false,
            detail: {
              item: dragItem,
              index: dropIndex,
              source: extraVars.$source,
              target: extraVars.$target,
              effect: dragEffect,
            },
          })
        );
      };

      // Keyboard: Enter/Space to drop when item is grabbed
      const keydownHandler = (e) => {
        if (!_dndState.dragging) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          dropHandler(e);
        }
      };

      el.addEventListener("dragover", dragoverHandler);
      el.addEventListener("dragenter", dragenterHandler);
      el.addEventListener("dragleave", dragleaveHandler);
      el.addEventListener("drop", dropHandler);
      el.addEventListener("keydown", keydownHandler);
      NoJS._onDispose(() => {
        el.removeEventListener("dragover", dragoverHandler);
        el.removeEventListener("dragenter", dragenterHandler);
        el.removeEventListener("dragleave", dragleaveHandler);
        el.removeEventListener("drop", dropHandler);
        el.removeEventListener("keydown", keydownHandler);
      });
    },
  });
}
