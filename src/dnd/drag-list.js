import { _dndState, _dragListRegistry } from "./state.js";
import { _injectDndStyles } from "./styles.js";
import {
  _calcDropIndex,
  _insertPlaceholder,
  _removePlaceholder,
  _isTypeAccepted,
  _countVisibleChildren,
} from "./helpers.js";

export function registerDragList(NoJS) {
  NoJS.directive("drag-list", {
    priority: 10,
    init(el, name, listPath) {
      _injectDndStyles();
      const ctx = NoJS.findContext(el);

      const tplId = el.getAttribute("template");
      const keyProp = el.getAttribute("drag-list-key");
      const itemName = el.getAttribute("drag-list-item") || "item";
      const sortDir = el.getAttribute("drop-sort") || "vertical";
      const type = el.getAttribute("drag-type") || ("__draglist_" + listPath);
      const acceptAttr = el.getAttribute("drop-accept") || type;
      const copyMode = el.hasAttribute("drag-list-copy");
      const removeMode = el.hasAttribute("drag-list-remove");
      const disabledDragExpr = el.getAttribute("drag-disabled");
      const disabledDropExpr = el.getAttribute("drop-disabled");
      const maxExpr = el.getAttribute("drop-max");
      const placeholderAttr = el.getAttribute("drop-placeholder");
      const placeholderClass = el.getAttribute("drop-placeholder-class");
      const dragClass = el.getAttribute("drag-class") || "nojs-dragging";
      const dropClass = el.getAttribute("drop-class") || "nojs-drag-over";
      const rejectClass = el.getAttribute("drop-reject-class") || "nojs-drop-reject";
      const settleClass = el.getAttribute("drop-settle-class") || "nojs-drop-settle";
      const emptyClass = el.getAttribute("drop-empty-class") || "nojs-drag-list-empty";

      // Accessibility
      el.setAttribute("role", "listbox");
      el.setAttribute("aria-dropeffect", copyMode ? "copy" : "move");

      // Register for cross-list communication
      const listInfo = { listPath, ctx, el };
      _dragListRegistry.set(el, listInfo);
      NoJS._onDispose(() => _dragListRegistry.delete(el));

      let _enterDepth = 0;
      let _prevList = null;

      // ─── Render items ──────────────────────────────────────────────────
      function renderItems() {
        const list = NoJS.resolve(listPath, ctx);
        if (!Array.isArray(list)) return;

        // Same reference & items already rendered — propagate to children
        // without rebuilding the DOM (preserves focus, input state, etc.)
        if (list === _prevList && list.length > 0 && el.children.length > 0) {
          for (const child of el.children) {
            if (child.__ctx && child.__ctx.$notify) child.__ctx.$notify();
          }
          return;
        }
        _prevList = list;

        const tpl = tplId ? document.getElementById(tplId) : null;
        if (!tpl) return;

        NoJS._disposeChildren(el);
        el.innerHTML = "";
        const count = list.length;

        list.forEach((item, i) => {
          const childData = {
            [itemName]: item,
            $index: i,
            $count: count,
            $first: i === 0,
            $last: i === count - 1,
            $even: i % 2 === 0,
            $odd: i % 2 !== 0,
          };
          const childCtx = NoJS.createContext(childData, ctx);

          const clone = tpl.content.cloneNode(true);
          const wrapper = document.createElement("div");
          wrapper.style.display = "contents";
          wrapper.__ctx = childCtx;
          wrapper.setAttribute("role", "option");

          // Append clone first so we can access the visible child
          wrapper.appendChild(clone);
          el.appendChild(wrapper);

          // The drag source is the first visible child
          // (display:contents wrapper has no box, so draggable must be on a rendered element)
          const dragEl = wrapper.firstElementChild || wrapper;
          dragEl.draggable = true;
          dragEl.setAttribute("aria-grabbed", "false");
          if (!dragEl.getAttribute("tabindex")) dragEl.setAttribute("tabindex", "0");

          // Per-item drag handlers (on wrapper so events from dragEl bubble up to them)
          const itemDragstart = (e) => {
            if (disabledDragExpr && NoJS.evaluate(disabledDragExpr, ctx)) {
              e.preventDefault();
              return;
            }
            _dndState.dragging = {
              item,
              type,
              effect: copyMode ? "copy" : "move",
              sourceEl: wrapper,
              sourceCtx: childCtx,
              sourceList: list,
              sourceIndex: i,
              listDirective: { el, listPath, ctx, keyProp, copyMode, removeMode },
            };
            if (e.dataTransfer) {
              e.dataTransfer.effectAllowed = copyMode ? "copy" : "move";
              e.dataTransfer.setData("text/plain", "");
            }
            dragClass.split(/\s+/).filter(Boolean).forEach((c) => dragEl.classList.add(c));
            dragEl.setAttribute("aria-grabbed", "true");

            el.dispatchEvent(
              new CustomEvent("drag-start", {
                bubbles: true,
                detail: { item, index: i, el: dragEl },
              })
            );
          };

          const itemDragend = () => {
            dragClass.split(/\s+/).filter(Boolean).forEach((c) => dragEl.classList.remove(c));
            dragEl.setAttribute("aria-grabbed", "false");

            // If drag-list-remove and item was NOT dropped in a target, no action
            // If dragging state is still set, it wasn't dropped
            if (_dndState.dragging && _dndState.dragging.sourceEl === wrapper) {
              _dndState.dragging = null;
            }
            _removePlaceholder();
          };

          wrapper.addEventListener("dragstart", itemDragstart);
          wrapper.addEventListener("dragend", itemDragend);

          // Keyboard DnD on items
          const itemKeydown = (e) => {
            if (e.key === " " && !_dndState.dragging) {
              e.preventDefault();
              _dndState.dragging = {
                item,
                type,
                effect: copyMode ? "copy" : "move",
                sourceEl: wrapper,
                sourceCtx: childCtx,
                sourceList: list,
                sourceIndex: i,
                listDirective: { el, listPath, ctx, keyProp, copyMode, removeMode },
              };
              dragClass.split(/\s+/).filter(Boolean).forEach((c) => dragEl.classList.add(c));
              dragEl.setAttribute("aria-grabbed", "true");
            } else if (e.key === "Escape" && _dndState.dragging && _dndState.dragging.sourceEl === wrapper) {
              e.preventDefault();
              dragClass.split(/\s+/).filter(Boolean).forEach((c) => dragEl.classList.remove(c));
              dragEl.setAttribute("aria-grabbed", "false");
              _dndState.dragging = null;
              _removePlaceholder();
            } else if ((e.key === "ArrowDown" || e.key === "ArrowRight") && _dndState.dragging && _dndState.dragging.sourceEl === wrapper) {
              e.preventDefault();
              // Navigate to next item via wrapper siblings
              const nextWrapper = wrapper.nextElementSibling;
              if (nextWrapper) {
                const nextEl = nextWrapper.firstElementChild || nextWrapper;
                nextEl.focus();
              }
            } else if ((e.key === "ArrowUp" || e.key === "ArrowLeft") && _dndState.dragging && _dndState.dragging.sourceEl === wrapper) {
              e.preventDefault();
              const prevWrapper = wrapper.previousElementSibling;
              if (prevWrapper) {
                const prevEl = prevWrapper.firstElementChild || prevWrapper;
                prevEl.focus();
              }
            }
          };
          wrapper.addEventListener("keydown", itemKeydown);

          // Register cleanup on wrapper so disposers run when _disposeChildren(el) is called
          wrapper.__disposers = wrapper.__disposers || [];
          wrapper.__disposers.push(
            () => wrapper.removeEventListener("dragstart", itemDragstart),
            () => wrapper.removeEventListener("dragend", itemDragend),
            () => wrapper.removeEventListener("keydown", itemKeydown),
          );

          NoJS.processTree(wrapper);
        });

        // Toggle empty class so the container remains a viable drop target
        const isEmpty = list.length === 0;
        emptyClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.toggle(c, isEmpty));
      }

      // ─── Drop zone handlers on the list container ─────────────────────
      const dragoverHandler = (e) => {
        if (!_dndState.dragging) return;
        if (disabledDropExpr && NoJS.evaluate(disabledDropExpr, ctx)) return;

        const typeOk = _isTypeAccepted(_dndState.dragging.type, acceptAttr);
        let maxOk = true;
        if (maxExpr) {
          const max = NoJS.evaluate(maxExpr, ctx);
          const list = NoJS.resolve(listPath, ctx);
          if (typeof max === "number" && Array.isArray(list) && list.length >= max) maxOk = false;
        }

        if (!typeOk || !maxOk) {
          rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c));
          dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
          _removePlaceholder();
          return;
        }

        rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));

        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = copyMode ? "copy" : "move";

        const idx = _calcDropIndex(el, e.clientX, e.clientY, sortDir);
        if (placeholderAttr) {
          _insertPlaceholder(el, idx, placeholderAttr, placeholderClass);
        }
      };

      const dragenterHandler = (e) => {
        if (!_dndState.dragging) return;
        if (disabledDropExpr && NoJS.evaluate(disabledDropExpr, ctx)) return;

        _enterDepth++;
        if (_enterDepth === 1) {
          const typeOk = _isTypeAccepted(_dndState.dragging.type, acceptAttr);
          let maxOk = true;
          if (maxExpr) {
            const max = NoJS.evaluate(maxExpr, ctx);
            const list = NoJS.resolve(listPath, ctx);
            if (typeof max === "number" && Array.isArray(list) && list.length >= max) maxOk = false;
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

      const dragleaveHandler = () => {
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
              detail: { item: _dndState.dragging?.item },
            })
          );
        }
      };

      const dropHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        _enterDepth = 0;

        if (!_dndState.dragging) return;
        if (disabledDropExpr && NoJS.evaluate(disabledDropExpr, ctx)) return;
        if (!_isTypeAccepted(_dndState.dragging.type, acceptAttr)) return;

        // Max check
        if (maxExpr) {
          const max = NoJS.evaluate(maxExpr, ctx);
          const list = NoJS.resolve(listPath, ctx);
          if (typeof max === "number" && Array.isArray(list) && list.length >= max) return;
        }

        const dragItem = _dndState.dragging.item;
        const sourceInfo = _dndState.dragging.listDirective;
        const sourceIndex = _dndState.dragging.sourceIndex;

        const dropIndex = _calcDropIndex(el, e.clientX, e.clientY, sortDir);

        // Remove visual feedback
        dropClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
        rejectClass.split(/\s+/).filter(Boolean).forEach((c) => el.classList.remove(c));
        _removePlaceholder();

        const targetList = NoJS.resolve(listPath, ctx);
        if (!Array.isArray(targetList)) return;

        // Self-drop check: same list, same position
        const isSameList = sourceInfo && sourceInfo.el === el;
        if (isSameList && sourceIndex === dropIndex) {
          _dndState.dragging = null;
          return;
        }
        // Same list, but adjacent position (effectively same position)
        if (isSameList && sourceIndex + 1 === dropIndex) {
          _dndState.dragging = null;
          return;
        }

        // Perform the list mutation
        let newTargetList = [...targetList];

        if (isSameList) {
          // Same-list reorder
          const [moved] = newTargetList.splice(sourceIndex, 1);
          const insertAt = sourceIndex < dropIndex ? dropIndex - 1 : dropIndex;
          newTargetList.splice(insertAt, 0, moved);
          ctx.$set(listPath, newTargetList);

          el.dispatchEvent(
            new CustomEvent("reorder", {
              bubbles: true,
              detail: { list: newTargetList, item: dragItem, from: sourceIndex, to: insertAt },
            })
          );
        } else {
          // Cross-list transfer
          const itemToInsert = copyMode ? (typeof dragItem === "object" ? { ...dragItem } : dragItem) : dragItem;
          newTargetList.splice(dropIndex, 0, itemToInsert);
          ctx.$set(listPath, newTargetList);

          // Remove from source if move mode
          if (sourceInfo && !sourceInfo.copyMode && (removeMode || sourceInfo.removeMode)) {
            const sourceList = NoJS.resolve(sourceInfo.listPath, sourceInfo.ctx);
            if (Array.isArray(sourceList) && sourceIndex != null) {
              const newSourceList = sourceList.filter((_, idx) => idx !== sourceIndex);
              sourceInfo.ctx.$set(sourceInfo.listPath, newSourceList);

              sourceInfo.el.dispatchEvent(
                new CustomEvent("remove", {
                  bubbles: true,
                  detail: { list: newSourceList, item: dragItem, index: sourceIndex },
                })
              );
            }
          }

          el.dispatchEvent(
            new CustomEvent("receive", {
              bubbles: true,
              detail: {
                list: newTargetList,
                item: dragItem,
                from: sourceIndex,
                fromList: sourceInfo ? NoJS.resolve(sourceInfo.listPath, sourceInfo.ctx) : null,
              },
            })
          );
        }

        // Settle animation (apply to visible child, not display:contents wrapper)
        requestAnimationFrame(() => {
          const children = [...el.children];
          const targetChild = children[isSameList ? (sourceIndex < dropIndex ? dropIndex - 1 : dropIndex) : dropIndex];
          if (targetChild) {
            const animEl = targetChild.firstElementChild || targetChild;
            settleClass.split(/\s+/).filter(Boolean).forEach((c) => animEl.classList.add(c));
            animEl.addEventListener("animationend", () => {
              settleClass.split(/\s+/).filter(Boolean).forEach((c) => animEl.classList.remove(c));
            }, { once: true });
          }
        });

        // Clear dragging state
        _dndState.dragging = null;
      };

      // Keyboard: Enter/Space to drop
      const keydownHandler = (e) => {
        if (!_dndState.dragging) return;
        if (!_isTypeAccepted(_dndState.dragging.type, acceptAttr)) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          // Simulate drop at the focused element's position
          const focused = el.querySelector(":focus");
          if (focused) {
            const measured = focused.style?.display === "contents"
              ? (focused.firstElementChild || focused) : focused;
            const rect = measured.getBoundingClientRect();
            const fakeEvent = {
              preventDefault() {},
              stopPropagation() {},
              clientX: rect.left + rect.width / 2,
              clientY: rect.top + rect.height + 1,
              dataTransfer: null,
            };
            dropHandler(fakeEvent);
          }
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

      // ─── Reactive rendering ──────────────────────────────────────────
      const unwatchList = ctx.$watch(renderItems);
      NoJS._onDispose(unwatchList);
      renderItems();
    },
  });
}
