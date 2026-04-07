import { _dndState } from "./state.js";

// Count visible children, recursing through display:contents wrappers
export function _countVisibleChildren(el) {
  let count = 0;
  for (const child of el.children) {
    if (child.classList.contains("nojs-drop-placeholder")) continue;
    const style = child.style || {};
    if (style.display === "contents") {
      count += _countVisibleChildren(child);
    } else {
      count++;
    }
  }
  return count;
}

// ─── Helper: calculate drop index from mouse position ─────────────────
export function _calcDropIndex(el, mouseX, mouseY, sortDir) {
  const children = [...el.children].filter(
    (c) => !c.classList.contains("nojs-drop-placeholder")
  );
  if (children.length === 0) return 0;

  for (let i = 0; i < children.length; i++) {
    // Use first visible child for display:contents wrappers
    const measured = children[i].style && children[i].style.display === "contents"
      ? (children[i].firstElementChild || children[i])
      : children[i];
    const rect = measured.getBoundingClientRect();
    if (sortDir === "horizontal") {
      const midX = rect.left + rect.width / 2;
      if (mouseX < midX) return i;
    } else if (sortDir === "grid") {
      const midX = rect.left + rect.width / 2;
      const midY = rect.top + rect.height / 2;
      if (mouseY < midY && mouseX < midX) return i;
      if (mouseY < rect.top + rect.height && mouseX < midX) return i;
    } else {
      // vertical (default)
      const midY = rect.top + rect.height / 2;
      if (mouseY < midY) return i;
    }
  }
  return children.length;
}

// ─── Helper: manage placeholder ─────────────��─────────────────────────
export function _insertPlaceholder(el, index, placeholderAttr, placeholderClass) {
  _removePlaceholder();

  let ph;
  if (placeholderAttr === "auto") {
    ph = document.createElement("div");
    ph.className = placeholderClass || "nojs-drop-placeholder";
    // Size placeholder to match the dragged item
    if (_dndState.dragging && _dndState.dragging.sourceEl) {
      const srcEl = _dndState.dragging.sourceEl.firstElementChild || _dndState.dragging.sourceEl;
      const rect = srcEl.getBoundingClientRect();
      if (rect.height > 0) ph.style.height = rect.height + "px";
      if (rect.width > 0) ph.style.width = rect.width + "px";
    }
  } else {
    // Template ID
    const tpl = document.getElementById(
      placeholderAttr.startsWith("#") ? placeholderAttr.slice(1) : placeholderAttr
    );
    if (tpl && tpl.content) {
      ph = document.createElement("div");
      ph.style.display = "contents";
      ph.className = placeholderClass || "nojs-drop-placeholder";
      ph.appendChild(tpl.content.cloneNode(true));
    } else {
      ph = document.createElement("div");
      ph.className = placeholderClass || "nojs-drop-placeholder";
    }
  }

  ph.classList.add("nojs-drop-placeholder");
  const children = [...el.children].filter(
    (c) => !c.classList.contains("nojs-drop-placeholder")
  );

  if (index >= children.length) {
    el.appendChild(ph);
  } else {
    el.insertBefore(ph, children[index]);
  }
  _dndState.placeholder = ph;
}

export function _removePlaceholder() {
  if (_dndState.placeholder) {
    _dndState.placeholder.remove();
    _dndState.placeholder = null;
  }
}

// ─── Helper: check if type is accepted ────────────��───────────────────
export function _isTypeAccepted(dragType, acceptAttr) {
  if (!acceptAttr || acceptAttr === "*") return true;
  const accepted = acceptAttr.split(",").map((s) => s.trim());
  return accepted.includes(dragType);
}

// ─── Helper: build stacked-cards ghost for multi-drag ─────────────────
export function _buildStackGhost(sourceEl, count) {
  const ghost = document.createElement("div");
  ghost.style.cssText = "position:fixed;top:-9999px;left:-9999px;pointer-events:none;z-index:99999;";

  const measured = sourceEl.style && sourceEl.style.display === "contents"
    ? (sourceEl.firstElementChild || sourceEl) : sourceEl;
  const rect = measured.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  const cs = getComputedStyle(measured);
  const maxStack = Math.min(count, 3);

  // Stack layers (back to front)
  for (let i = maxStack - 1; i >= 0; i--) {
    const layer = document.createElement("div");
    const offset = i * 4;
    layer.style.cssText =
      "position:absolute;" +
      "top:" + offset + "px;left:" + offset + "px;" +
      "width:" + w + "px;height:" + h + "px;" +
      "border-radius:" + cs.borderRadius + ";" +
      "box-shadow:0 1px 4px rgba(0,0,0,0.12);" +
      "overflow:hidden;box-sizing:border-box;";

    if (i === 0) {
      // Top card: clone content
      layer.innerHTML = measured.innerHTML;
      layer.style.background = cs.backgroundColor || "#fff";
      layer.style.border = cs.border;
      layer.style.padding = cs.padding;
      layer.style.fontSize = cs.fontSize;
      layer.style.color = cs.color;
      layer.style.fontFamily = cs.fontFamily;
    } else {
      // Back cards: solid fill
      layer.style.background = cs.backgroundColor || "#fff";
      layer.style.border = cs.border || "1px solid #ddd";
    }
    ghost.appendChild(layer);
  }

  // Count badge
  const badge = document.createElement("div");
  badge.textContent = count;
  badge.style.cssText =
    "position:absolute;top:-6px;right:-6px;" +
    "min-width:22px;height:22px;padding:0 5px;" +
    "background:#3b82f6;color:#fff;border-radius:11px;" +
    "display:flex;align-items:center;justify-content:center;" +
    "font-size:11px;font-weight:700;border:2px solid #fff;" +
    "box-shadow:0 1px 3px rgba(0,0,0,0.2);";
  ghost.appendChild(badge);

  // Container size
  ghost.style.width = (w + (maxStack - 1) * 4) + "px";
  ghost.style.height = (h + (maxStack - 1) * 4) + "px";

  return ghost;
}
