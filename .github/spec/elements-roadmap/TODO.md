# NoJS Elements — Implementation Roadmap

**Status**: Implementation + Unit Tests Complete | E2E Tests Pending
**Date**: 2026-04-03
**Build**: 63KB per bundle (IIFE/ESM/CJS) — all passing
**Tests**: 430 tests across 11 suites — all passing
**Code Review**: 5 issues found and fixed (toast DOM leak, tree microtask race, modal-open rAF dispose, table stale snapshot, table DOM property leak)

> 10 new UI elements for `nojs-elements`. Each phase is independent and can run in parallel.
> All elements follow the DnD reference pattern (`src/dnd/`).

## Completion Status

| Element | Implementation | Unit Tests | E2E Tests |
|---------|---------------|------------|-----------|
| Tooltip/Popover | ✅ | ✅ 34 tests | ◻️ |
| Modal | ✅ | ✅ 41 tests | ◻️ |
| Dropdown | ✅ | ✅ 37 tests | ◻️ |
| Toast | ✅ | ✅ 41 tests | ◻️ |
| Tabs | ✅ | ✅ tests | ◻️ |
| Tree | ✅ | ✅ tests | ◻️ |
| Stepper | ✅ | ✅ 55 tests | ◻️ |
| Skeleton | ✅ | ✅ 25 tests | ◻️ |
| Split/Pane | ✅ | ✅ 35 tests | ◻️ |
| Sortable Table | ✅ | ✅ 30 tests | ◻️ |
| **Plugin Integration** | ✅ | ✅ 64 DnD tests | — |

## Reference: Implementation Pattern

Every element module follows this structure:

```
src/<element>/
  index.js      — barrel: register<Element>(NoJS) + cleanup<Element>()
  state.js      — module-scoped shared state (Maps, Sets, registries)
  styles.js     — _inject<Element>Styles() with <style data-nojs-<element>>
  <directive>.js — register<Directive>(NoJS) using NoJS.directive()
```

**Plugin API used by all elements:**
- `NoJS.directive(name, { priority, init(el, name, expr) })` — register directive
- `NoJS.findContext(el)` / `NoJS.evaluate(expr, ctx)` — evaluate expressions
- `NoJS._onDispose(fn)` — cleanup listeners on teardown
- `NoJS._execStatement(expr, ctx, vars)` — execute expressions with injected variables
- `NoJS._warn(msg)` — console warnings
- `NoJS.global(name, value)` — register global context functions (Toast only)

**CSS rules:** Minimal — positioning, display, layout only. No opinionated colors/fonts. All classes use `.nojs-*` prefix. One `<style data-nojs-X>` injection per module.

**Test patterns:**
- Unit: Jest, `import NoJS` + `NoJS.use(NoJSElements)`, `document.createElement` + `NoJS.processTree()`, mock events, verify DOM/ARIA/state
- E2E: Playwright, `page.goto('/e2e/examples/<element>.html')`, `getByTestId`, real interactions, verify visual + keyboard + accessibility

---

## Phase 1 — Tooltip / Popover

### 1.1 Implementation `@nojs-dev-js`

**Files:** `src/tooltip/index.js`, `state.js`, `styles.js`, `tooltip.js`, `popover.js`

**`tooltip.js` — `registerTooltip(NoJS)`**
- Register `tooltip` directive via `NoJS.directive("tooltip", { init(el, name, expr) })`
- On init: create floating `<div class="nojs-tooltip" popover>` element
- Position via CSS anchor positioning with manual calculation fallback
- Show on `mouseenter`/`focusin`, hide on `mouseleave`/`focusout`
- Read `tooltip-position` attr: `top` (default), `bottom`, `left`, `right`
- Read `tooltip-delay` attr: delay in ms before showing (default: 300)
- Set ARIA: `aria-describedby` on trigger pointing to tooltip `id`
- Cleanup: `NoJS._onDispose()` for all event listeners, remove tooltip element

**`popover.js` — `registerPopover(NoJS)`**
- Register `popover` directive: find `[popover="id"]` elements, set native `popover="auto"` on DOM
- Register `popover-trigger` directive: bind trigger to `showPopover()`/`hidePopover()` on click
- Register `popover-dismiss` directive: close popover from inside (optional explicit close button)
- Light dismiss comes free from Popover API (`popover="auto"`)
- Read `popover-class` attr: additional CSS class on the popover element
- NoJS content inside popover (`model`, `bind`, etc.) works automatically
- Cleanup: `NoJS._onDispose()` for click listeners

**`state.js`**
- Registry of active popovers (Map: id -> element)
- Timeout tracking for tooltip delays (Map: element -> timeoutId)
- `resetTooltipState()` to clear all

**`styles.js` — `_injectTooltipStyles()`**
- Inject `<style data-nojs-tooltip>` once
- `.nojs-tooltip`: position absolute, z-index, padding, border-radius, pointer-events
- `.nojs-tooltip-arrow`: CSS triangle/arrow for directional popovers
- Position variants: `.nojs-tooltip-top`, `.nojs-tooltip-bottom`, `.nojs-tooltip-left`, `.nojs-tooltip-right`
- Fade in/out animation via opacity transition

### 1.2 Unit Tests `@nojs-qa-unit-test`

**File:** `__tests__/tooltip.test.js`

- Tooltip shows on mouseenter, hides on mouseleave
- Tooltip shows on focusin, hides on focusout
- Tooltip respects `tooltip-delay` (timer-based show)
- Tooltip positions correctly for all 4 directions (`tooltip-position`)
- `aria-describedby` is set on trigger, tooltip has matching `id`
- Popover opens on trigger click, closes on outside click (light dismiss)
- `popover-trigger` correctly links to `[popover="id"]` by ID
- `popover-dismiss` closes the popover from inside
- `popover-class` applies additional CSS class
- Multiple tooltips/popovers can coexist
- Cleanup: disposing removes tooltip elements and event listeners
- Style injection: `<style data-nojs-tooltip>` is injected once, not duplicated

### 1.3 E2E Tests `@nojs-qa-e2e`

**Files:** `e2e/tests/tooltip.spec.ts`, `e2e/examples/tooltip.html`

- Fixture HTML with: basic tooltip, positioned tooltips (all 4 directions), popover with NoJS content (`bind`, `model`), popover with dismiss button, delayed tooltip
- Tests: hover shows tooltip, tooltip disappears on mouse leave, keyboard focus triggers tooltip, popover opens/closes on click, light dismiss works, popover-dismiss button closes, positioning does not overflow viewport, multiple popovers only one open at a time

---

## Phase 2 — Modal

### 2.1 Implementation `@nojs-dev-js`

**Files:** `src/modal/index.js`, `state.js`, `styles.js`, `modal.js`, `modal-open.js`, `modal-close.js`

**`modal.js` — `registerModal(NoJS)`**
- Register `modal` directive: find `[modal="id"]` elements, set native `popover="manual"` on DOM
- On `toggle` event (popover): manage focus trap, backdrop, body scroll lock
- Focus trap: on open, focus first focusable child; Tab cycles within modal; Shift+Tab cycles backward
- Esc key: close modal (unless `modal-close-on-esc="false"`)
- On close: restore focus to the trigger element that opened it
- Read `modal-class` attr: additional CSS class on modal element
- Read `modal-persist` attr: if true, don't destroy modal content on close
- ARIA: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to first heading

**`modal-open.js` — `registerModalOpen(NoJS)`**
- Register `modal-open` directive: click handler calls `el.showPopover()` on target modal
- Store reference to trigger element for focus restoration
- Push to modal stack (for nested modals)

**`modal-close.js` — `registerModalClose(NoJS)`**
- Register `modal-close` directive: click handler calls `el.hidePopover()` on closest ancestor `[modal]`
- Pop from modal stack
- If `modal-close` has a value, it's the specific modal ID to close (for closing from outside)

**`state.js`**
- Modal stack: array of `{ modalEl, triggerEl }` for nested modal support
- `resetModalState()` to clear stack

**`styles.js` — `_injectModalStyles()`**
- Inject `<style data-nojs-modal>` once
- `[modal]`: fixed positioning, centering (flexbox on `::backdrop`), z-index management
- `::backdrop` native styling: semi-transparent overlay, backdrop-filter blur (optional)
- `.nojs-modal-open` on body: `overflow: hidden` to prevent background scroll
- Entry/exit animation: fade + scale transform

### 2.2 Unit Tests `@nojs-qa-unit-test`

**File:** `__tests__/modal.test.js`

- `modal-open` click opens the correct modal by ID
- `modal-close` click closes the modal
- `modal-close` with value closes specific modal by ID
- Focus trap: Tab cycles within modal, does not escape
- Focus restoration: focus returns to trigger on close
- Esc key closes modal (default behavior)
- `modal-close-on-esc="false"` prevents Esc from closing
- `modal-class` applies additional CSS class
- Nested modals: opening a second modal pushes to stack, closing pops
- `popover="manual"` is set on the modal element
- ARIA: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` set
- Body scroll lock: `overflow: hidden` applied on open, removed on close
- Cleanup: disposing removes all listeners and restores DOM state

### 2.3 E2E Tests `@nojs-qa-e2e`

**Files:** `e2e/tests/modal.spec.ts`, `e2e/examples/modal.html`

- Fixture HTML with: basic modal, modal with dynamic NoJS content (`bind`, `model`, `on:click`), nested modals, modal with `modal-close-on-esc="false"`, modal with `modal-class`
- Tests: open/close flow, backdrop visible, focus trapped inside, Esc closes, nested modal stacking, focus restoration after close, NoJS expressions work inside modal, body scroll locked while open

---

## Phase 3 — Dropdown

### 3.1 Implementation `@nojs-dev-js`

**Files:** `src/dropdown/index.js`, `state.js`, `styles.js`, `dropdown.js`, `item.js`

**`dropdown.js` — `registerDropdown(NoJS)`**
- Register `dropdown` directive: container that coordinates toggle + menu + items
- Register `dropdown-toggle` directive: click handler calls `togglePopover()` on sibling `[dropdown-menu]`
- Register `dropdown-menu` directive: set native `popover="auto"` on the menu element
- Position menu below toggle by default, flip up if no space (CSS anchor or manual calc)
- Light dismiss from Popover API (`popover="auto"`)
- ARIA: toggle gets `aria-haspopup="true"`, `aria-expanded`, menu gets `role="menu"`, link toggle to menu via `aria-controls`
- Read `dropdown-position` attr: `bottom` (default), `top`, `left`, `right`
- Read `dropdown-align` attr: `start` (default), `end`, `center`

**`item.js` — `registerDropdownItem(NoJS)`**
- Register `dropdown-item` directive with roving tabindex keyboard navigation
- Keyboard: `Enter`/`Space` on toggle opens menu and focuses first item; Arrow Down/Up navigates items (skip `disabled`); `Enter` on item activates; `Esc` closes menu and returns focus to toggle; `Home`/`End` jump to first/last item
- Set `role="menuitem"` on each item, `tabindex="-1"` (roving: active item gets `tabindex="0"`)
- Skip items with `disabled` attribute during navigation

**`state.js`**
- Registry of open dropdowns (Map: element -> { toggle, menu, items })
- `resetDropdownState()` to clear

**`styles.js` — `_injectDropdownStyles()`**
- Inject `<style data-nojs-dropdown>` once
- `.nojs-dropdown-menu`: absolute positioning, z-index, min-width matching toggle width
- `.nojs-dropdown-item`: cursor pointer, highlight on focus/hover
- `.nojs-dropdown-item[disabled]`: opacity, pointer-events none

### 3.2 Unit Tests `@nojs-qa-unit-test`

**File:** `__tests__/dropdown.test.js`

- Toggle click opens menu, second click closes
- Light dismiss (click outside) closes menu
- Keyboard: Enter/Space on toggle opens, Arrow Down focuses first item
- Keyboard: Arrow Down/Up navigates items, skips disabled
- Keyboard: Enter on item dispatches click, Esc closes menu
- Keyboard: Home/End jump to first/last item
- Focus returns to toggle after close
- ARIA: `aria-haspopup`, `aria-expanded`, `role="menu"`, `role="menuitem"`, `aria-controls`
- `popover="auto"` is set on menu element
- Disabled items are skipped in keyboard navigation
- Roving tabindex: active item has `tabindex="0"`, others `tabindex="-1"`
- Dynamic items via `each` directive work correctly
- Cleanup: disposing removes all listeners

### 3.3 E2E Tests `@nojs-qa-e2e`

**Files:** `e2e/tests/dropdown.spec.ts`, `e2e/examples/dropdown.html`

- Fixture HTML with: basic dropdown, dropdown with disabled items, dropdown with dynamic `each` content, positioned dropdown (top/bottom)
- Tests: click to open/close, keyboard navigation full cycle, disabled items skipped, light dismiss, dynamic items render and are navigable, positioning flips when near viewport edge

---

## Phase 4 — Toast

### 4.1 Implementation `@nojs-dev-js`

**Files:** `src/toast/index.js`, `state.js`, `styles.js`, `toast.js`

**`toast.js` — `registerToast(NoJS)`**
- Register `toast-container` directive: mark element as toast region with `position: fixed`
- Read `toast-container` value for position: `top-right` (default), `top-left`, `top-center`, `bottom-right`, `bottom-left`, `bottom-center`
- Register `toast` declarative directive: observe expression, fire toast when value becomes truthy
- Read `toast-type`, `toast-duration`, `toast-dismiss` attrs on declarative toasts
- **Register `$toast` global function via `NoJS.global("$toast", fn)`:**
  - Signature: `$toast(message, type = "info", duration = 3000)`
  - Types: `info`, `success`, `warning`, `error`
  - Creates `<div popover="manual" class="nojs-toast nojs-toast-{type}">` inside the container
  - Calls `showPopover()`, schedules `hidePopover()` + element removal after duration
  - `toast-dismiss` attr or click on close button dismisses immediately
- Stack: multiple toasts stack vertically with gap; new toasts enter at top or bottom depending on container position
- ARIA: `role="status"`, `aria-live="polite"` on container; individual toasts get `role="alert"` for errors
- Cleanup: `NoJS._onDispose()` for all timers, remove toast elements

**`state.js`**
- Toast queue: array of active toasts `{ el, timer, type }`
- Active timers Map for cleanup
- Container registry (Map: position -> containerEl)
- `resetToastState()` to clear all

**`styles.js` — `_injectToastStyles()`**
- Inject `<style data-nojs-toast>` once
- `.nojs-toast-container`: fixed positioning per position variant, flex column, gap, z-index
- `.nojs-toast`: padding, border-radius, box-shadow, min-width
- `.nojs-toast-info`, `.nojs-toast-success`, `.nojs-toast-warning`, `.nojs-toast-error`: left border color indicator (using `color-mix` for auto dark mode compat)
- Entry animation: slide-in from edge; exit animation: fade-out + slide

### 4.2 Unit Tests `@nojs-qa-unit-test`

**File:** `__tests__/toast.test.js`

- `$toast()` global function is registered and callable from expressions
- `$toast("msg", "success")` creates a toast element inside the container
- Toast auto-dismisses after specified duration (use `jest.advanceTimersByTime`)
- `toast-dismiss` attribute enables manual close button
- Multiple toasts stack in order
- All 4 types (`info`, `success`, `warning`, `error`) apply correct CSS class
- Toast container positions: all 6 positions create correct fixed positioning
- Declarative `[toast]` fires when expression becomes truthy
- ARIA: `role="status"` on container, `role="alert"` for error toasts
- `popover="manual"` is set on toast elements
- Cleanup: disposing clears all timers and removes toast elements
- Style injection: `<style data-nojs-toast>` injected once

### 4.3 E2E Tests `@nojs-qa-e2e`

**Files:** `e2e/tests/toast.spec.ts`, `e2e/examples/toast.html`

- Fixture HTML with: toast container (top-right), buttons triggering `$toast()` with different types, declarative toast bound to state, manual dismiss button
- Tests: clicking button shows toast, toast auto-disappears after duration, multiple toasts stack, dismiss button removes immediately, different types have visual distinction, declarative toast triggers on state change

---

## Phase 5 — Tabs

### 5.1 Implementation `@nojs-dev-js`

**Files:** `src/tabs/index.js`, `state.js`, `styles.js`, `tabs.js`, `tab.js`

**`tabs.js` — `registerTabs(NoJS)`**
- Register `tabs` directive: on init, collect all `[tab]` and `[panel]` children (interleaved pairs)
- Generate a `<div role="tablist">` wrapper, move tab elements into it
- Associate each tab with its panel by index
- Activate first tab (or index from `tabs` attr value, 0-based)
- ARIA on container: implicit grouping via tablist

**`tab.js` — `registerTab(NoJS)` + `registerPanel(NoJS)`**
- Register `tab` directive: set `role="tab"`, `aria-selected`, `aria-controls` pointing to panel, `tabindex`
- Register `panel` directive: set `role="tabpanel"`, `aria-labelledby` pointing to tab, `id`
- Click on tab: `aria-selected="true"`, show corresponding panel, hide others
- Inactive panels: `display: none` + `inert` attribute (prevents focus/screen reader)
- Keyboard: Left/Right arrows navigate between tabs; Home/End jump to first/last tab; Tab key moves focus from tablist to active panel content
- Read `tab-active` attr: programmatic tab activation via expression

**`state.js`**
- Active tab index per tabs container (Map: containerEl -> activeIndex)
- `resetTabsState()` to clear

**`styles.js` — `_injectTabsStyles()`**
- Inject `<style data-nojs-tabs>` once
- `[role="tablist"]`: flex row, gap
- `[role="tab"]`: cursor pointer, no default button styling
- `[role="tab"][aria-selected="true"]`: visual indicator (border-bottom or similar minimal style)
- `[role="tabpanel"][hidden]`, `[role="tabpanel"]:not([hidden])`: display management

### 5.2 Unit Tests `@nojs-qa-unit-test`

**File:** `__tests__/tabs.test.js`

- Init creates tablist wrapper with correct ARIA roles
- First tab is active by default
- `tabs="2"` activates third tab (0-based index)
- Clicking a tab switches to it and hides other panels
- Inactive panels get `inert` attribute
- ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby`
- Keyboard: Left/Right arrow navigation between tabs
- Keyboard: Home/End jump to first/last tab
- Keyboard: Tab key moves from tablist to active panel
- Dynamic content inside panels (NoJS `bind`, `each`) works
- Cleanup: disposing removes generated wrapper and restores DOM

### 5.3 E2E Tests `@nojs-qa-e2e`

**Files:** `e2e/tests/tabs.spec.ts`, `e2e/examples/tabs.html`

- Fixture HTML with: basic 3-tab setup, tabs with initial active index, tabs with dynamic NoJS content in panels (`get`, `each`, `bind`)
- Tests: initial tab active and panel visible, click switches tabs, keyboard Left/Right navigates, Home/End work, only active panel visible, NoJS content renders in active panel, ARIA attributes correct

---

## Phase 6 — Tree

### 6.1 Implementation `@nojs-dev-js`

**Files:** `src/tree/index.js`, `state.js`, `styles.js`, `tree.js`

**`tree.js` — `registerTree(NoJS)`, `registerBranch(NoJS)`, `registerSubtree(NoJS)`**
- Register `tree` directive: set `role="tree"` on root, initialize keyboard navigation
- Register `branch` directive: set `role="treeitem"` on `<li>`, create expand/collapse toggle
  - Click on branch text (not subtree) toggles `[subtree]` visibility
  - `branch="expanded"` starts open, default is collapsed
  - ARIA: `aria-expanded="true"/"false"` on branch
  - `tabindex`: roving tabindex across visible tree items
- Register `subtree` directive: set `role="group"` on `<ul>`, manage visibility
- Keyboard navigation (WAI-ARIA TreeView pattern):
  - Right arrow on collapsed branch: expand
  - Right arrow on expanded branch: focus first child
  - Left arrow on child: focus parent branch
  - Left arrow on expanded branch: collapse
  - Up/Down arrows: move between visible items
  - Home/End: first/last visible item
  - Typeahead: typing characters focuses matching item (printable key search with timeout reset)
  - Enter/Space: activate item (trigger `on:click` if present)

**`state.js`**
- Expanded branches Map: (branchEl -> boolean)
- Typeahead buffer + timer
- `resetTreeState()` to clear

**`styles.js` — `_injectTreeStyles()`**
- Inject `<style data-nojs-tree>` once
- `.nojs-tree`: list-style none, padding management
- `.nojs-branch-toggle`: expand/collapse icon (CSS triangle or +/-), cursor pointer
- `.nojs-subtree-collapsed`: display none
- Indentation via padding-left per nesting level

### 6.2 Unit Tests `@nojs-qa-unit-test`

**File:** `__tests__/tree.test.js`

- Init sets `role="tree"` on root, `role="treeitem"` on branches, `role="group"` on subtrees
- Branches start collapsed by default
- `branch="expanded"` starts open
- Click on branch toggles subtree visibility
- `aria-expanded` updates on toggle
- Keyboard: Right arrow expands collapsed branch
- Keyboard: Right arrow on expanded focuses first child
- Keyboard: Left arrow collapses expanded branch
- Keyboard: Left arrow on child focuses parent
- Keyboard: Up/Down navigate visible items
- Keyboard: Home/End jump to first/last visible item
- Typeahead: typing "D" focuses first item starting with "D"
- Nested branches work (multi-level expand/collapse)
- Dynamic tree via `each` directive renders and navigates correctly
- Cleanup: disposing resets state and removes listeners

### 6.3 E2E Tests `@nojs-qa-e2e`

**Files:** `e2e/tests/tree.spec.ts`, `e2e/examples/tree.html`

- Fixture HTML with: static nested tree (3 levels), dynamic tree via `each` with nested data, branches with `branch="expanded"`
- Tests: initial collapsed state, click expands/collapses, keyboard navigation full cycle, typeahead search, deep nesting works, dynamic data renders tree correctly, ARIA attributes present

---

## Phase 7 — Stepper

### 7.1 Implementation `@nojs-dev-js`

**Files:** `src/stepper/index.js`, `state.js`, `styles.js`, `stepper.js`, `step.js`

**`stepper.js` — `registerStepper(NoJS)`**
- Register `stepper` directive: collect all `[step]` children
- Generate progress indicator in header (numbered steps: 1 -> 2 -> 3)
- Generate Prev/Next buttons in footer
- Only active step is visible, others get `display: none` + `inert`
- Read `stepper-mode` attr: `linear` (default) or `free`
  - Linear: Next validates current step before advancing (check `required`/`validate` on inputs)
  - Free: any step clickable in progress indicator
- Expose `$stepper` context object on the stepper element via local context:
  - `$stepper.current` — current step index (0-based)
  - `$stepper.total` — total number of steps
  - `$stepper.isFirst` / `$stepper.isLast` — boolean helpers
  - `$stepper.next()` / `$stepper.prev()` — navigation methods
  - `$stepper.goTo(index)` — jump to specific step (respects mode)
- ARIA: `aria-current="step"` on active step indicator, `role="group"` on step container

**`step.js` — `registerStep(NoJS)`**
- Register `step` directive: mark as step content
- Read `step-label` attr: custom label for progress indicator (default: "Step N")
- Read `step-icon` attr: custom icon/emoji for indicator
- Read `step-optional` attr: marks step as skippable in linear mode

**`state.js`**
- Current step index per stepper (Map: stepperEl -> { current, total, mode })
- Validation state per step
- `resetStepperState()` to clear

**`styles.js` — `_injectStepperStyles()`**
- Inject `<style data-nojs-stepper>` once
- `.nojs-stepper-indicator`: flex row of step markers, connecting lines between steps
- `.nojs-step-marker`: circle with number, completed/active/pending states
- `.nojs-stepper-nav`: flex row for Prev/Next buttons, justify-content space-between
- Active step marker: distinct visual state (border or fill)
- Completed step marker: checkmark or filled circle

### 7.2 Unit Tests `@nojs-qa-unit-test`

**File:** `__tests__/stepper.test.js`

- Init shows first step, hides others
- Progress indicator generated with correct number of steps
- Prev/Next buttons generated
- Next button advances to next step
- Prev button goes back
- Linear mode: Next fails if required inputs are empty
- Linear mode: Next succeeds after filling required inputs
- Free mode: clicking step indicator jumps to that step
- `$stepper.current` updates on navigation
- `$stepper.isFirst`/`$stepper.isLast` are correct
- `$stepper.next()`/`$stepper.prev()`/`$stepper.goTo()` work from expressions
- `step-label` customizes indicator text
- `step-optional` allows skipping in linear mode
- ARIA: `aria-current="step"` on active indicator
- Inactive steps get `inert` attribute
- Cleanup: disposing removes generated indicators, buttons, and listeners

### 7.3 E2E Tests `@nojs-qa-e2e`

**Files:** `e2e/tests/stepper.spec.ts`, `e2e/examples/stepper.html`

- Fixture HTML with: 3-step form (linear) with required inputs, free-mode stepper with custom labels, stepper using `$stepper` in expressions
- Tests: initial state shows step 1, Next/Prev navigation, validation blocks advance on empty fields, validation allows advance after fill, free mode allows jumping, progress indicator updates, `$stepper` context values display correctly, completed steps show checkmark

---

## Phase 8 — Skeleton

### 8.1 Implementation `@nojs-dev-js`

**Files:** `src/skeleton/index.js`, `styles.js`, `skeleton.js`

> Note: Skeleton has no `state.js` — it's purely per-element with no shared state.

**`skeleton.js` — `registerSkeleton(NoJS)`**
- Register `skeleton` directive: observe expression value via `NoJS.evaluate()`
- While expression is truthy:
  - Add `.nojs-skeleton` class to element
  - Hide real content (`opacity: 0`, `pointer-events: none` on children)
  - Show shimmer animation overlay via `::after` pseudo-element
  - Maintain original element dimensions
- When expression becomes falsy:
  - Remove `.nojs-skeleton` class with fade transition
  - Reveal content
- Read `skeleton-type` attr: `text` (default), `circle`, `rect`
  - `text`: full-width rounded rectangle(s)
  - `circle`: circular placeholder
  - `rect`: rectangular placeholder
- Read `skeleton-lines` attr: number of simulated text lines (generates multiple shimmer bars)
- Read `skeleton-size` attr: explicit dimension in px for `circle`/`rect` types
- Read `skeleton-radius` attr: custom border-radius

**`styles.js` — `_injectSkeletonStyles()`**
- Inject `<style data-nojs-skeleton>` once
- `.nojs-skeleton`: position relative, overflow hidden
- `.nojs-skeleton > *`: opacity 0, pointer-events none
- `.nojs-skeleton::after`: shimmer animation (linear-gradient sweep via `@keyframes`)
- Background color: `color-mix(in srgb, currentColor 10%, transparent)` for auto dark mode compatibility
- `.nojs-skeleton-circle`: border-radius 50%
- `.nojs-skeleton-line`: height ~1em, margin-bottom for multi-line
- `@keyframes nojs-shimmer`: translateX(-100%) to translateX(100%) for sweep effect
- `prefers-reduced-motion`: disable animation, show static placeholder

### 8.2 Unit Tests `@nojs-qa-unit-test`

**File:** `__tests__/skeleton.test.js`

- Skeleton class added when expression is truthy
- Skeleton class removed when expression becomes falsy
- Children get `opacity: 0` while skeleton active
- `skeleton-type="circle"` adds circle class
- `skeleton-type="rect"` adds rect class
- `skeleton-lines="3"` generates 3 line placeholders
- `skeleton-size="64"` sets dimension
- Expression reactivity: changing context value toggles skeleton
- Style injection: `<style data-nojs-skeleton>` injected once
- Cleanup: disposing removes skeleton class and restores children

### 8.3 E2E Tests `@nojs-qa-e2e`

**Files:** `e2e/tests/skeleton.spec.ts`, `e2e/examples/skeleton.html`

- Fixture HTML with: text skeleton bound to `loading` state, circle skeleton for avatar, multi-line skeleton, button that toggles `loading` to false
- Tests: skeleton visible on load, shimmer animation playing, clicking "Load" removes skeleton and reveals content, circle type renders as circle, multi-line shows correct number of bars, content is hidden while skeleton active

---

## Phase 9 — Split / Pane

### 9.1 Implementation `@nojs-dev-js`

**Files:** `src/split/index.js`, `state.js`, `styles.js`, `split.js`, `pane.js`

**`split.js` — `registerSplit(NoJS)`**
- Register `split` directive: read value `horizontal` (default) or `vertical`
- On init: set flex container, insert gutter elements between each pair of `[pane]` children
- Gutter: draggable separator element (`<div class="nojs-split-gutter" tabindex="0">`)
- Mouse drag: recalculate adjacent pane `flex-basis` percentages based on pointer position
- Touch support: `touchstart`/`touchmove`/`touchend` alongside mouse events
- Read `split-persist` attr: if present, save pane sizes to `localStorage` under given key; restore on init
- Read `split-gutter-size` attr: gutter width/height in px (default: 8)
- `NoJS._onDispose()` for all mouse/touch/keyboard listeners
- Nested splits: inner `[split]` inside a `[pane]` works recursively

**`pane.js` — `registerPane(NoJS)`**
- Register `pane` directive: read initial size from attr value (e.g., `"30%"`, `"250px"`)
- Set `flex-basis` and `flex-grow`/`flex-shrink` accordingly
- Read `pane-min` attr: minimum size in px
- Read `pane-max` attr: maximum size in px
- Read `pane-collapsible` attr: double-click gutter collapses pane to minimum, double-click again restores
- Enforce min/max constraints during drag resize

**Keyboard on gutter:**
- Left/Right (horizontal) or Up/Down (vertical): resize in 10px increments
- Home: collapse to minimum size
- End: expand to maximum size
- ARIA: `role="separator"`, `aria-orientation`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`

**`state.js`**
- Pane sizes per split container (Map: splitEl -> paneSize[])
- Drag state: { active, startPos, startSizes }
- `resetSplitState()` to clear

**`styles.js` — `_injectSplitStyles()`**
- Inject `<style data-nojs-split>` once
- `.nojs-split-horizontal`: display flex, flex-direction row
- `.nojs-split-vertical`: display flex, flex-direction column
- `.nojs-split-gutter`: flex-shrink 0, cursor col-resize / row-resize, background subtle
- `.nojs-split-gutter:hover`, `.nojs-split-gutter:active`: visual feedback
- `.nojs-pane`: overflow auto, min-width/min-height 0

### 9.2 Unit Tests `@nojs-qa-unit-test`

**File:** `__tests__/split.test.js`

- Init creates gutters between panes
- Horizontal split: panes side by side, gutter has `cursor: col-resize`
- Vertical split: panes stacked, gutter has `cursor: row-resize`
- Pane initial size from attr value applied as `flex-basis`
- Mouse drag resizes adjacent panes
- `pane-min`/`pane-max` constraints enforced during drag
- `pane-collapsible`: double-click collapses, double-click restores
- Keyboard: arrow keys resize in 10px increments
- Keyboard: Home/End set to min/max
- `split-persist`: sizes saved to localStorage on drag end
- `split-persist`: sizes restored from localStorage on init
- ARIA: `role="separator"`, `aria-orientation`, value attributes
- Nested splits render correctly
- Cleanup: disposing removes gutters and listeners

### 9.3 E2E Tests `@nojs-qa-e2e`

**Files:** `e2e/tests/split.spec.ts`, `e2e/examples/split.html`

- Fixture HTML with: horizontal 2-pane split (30%/70%), vertical split, nested split (sidebar + editor/console), split with min/max constraints, split with persistence key
- Tests: initial pane sizes correct, drag gutter resizes panes, min/max constraints respected, keyboard resize works, double-click collapse/restore, nested splits function independently, localStorage persistence survives page reload

---

## Phase 10 — Sortable Table

### 10.1 Implementation `@nojs-dev-js`

**Files:** `src/table/index.js`, `state.js`, `styles.js`, `table.js`

**`table.js` — `registerSortable(NoJS)`, `registerSort(NoJS)`, `registerFixed(NoJS)`**

**`registerSortable(NoJS)`:**
- Register `sortable` directive on `<table>`: initialize sort coordination
- Find `[each]` binding in `<tbody>` to identify the context array to sort
- Use `NoJS.findContext(el)` to get the data context

**`registerSort(NoJS)`:**
- Register `sort` directive on `<th>`: the attr value is the sort key (e.g., `sort="nome"`)
- Click handler: cycle sort direction `asc -> desc -> none`
- On sort: mutate the array in context via `Array.prototype.sort()` with the key comparator
  - The NoJS `[each]` directive automatically re-renders when context array changes
- Read `sort-type` attr: `string` (default), `number`, `date` — determines comparator
- Read `sort-default` attr: `asc` or `desc` — initial sort on init
- Visual indicator: toggle `data-sort="asc"` / `data-sort="desc"` / remove on `<th>`
- ARIA: `aria-sort="ascending"` / `aria-sort="descending"` / `aria-sort="none"` on `<th>`
- Only one column sorted at a time: clicking a new column resets others

**`registerFixed(NoJS)`:**
- Register `fixed-header` directive on `<thead>`: apply `position: sticky; top: 0`
- Register `fixed-col` directive on `<th>`/`<td>`: apply `position: sticky; left: 0`
- Handle z-index stacking for fixed-header + fixed-col intersection (top-left cell)

**`state.js`**
- Sort state per table (Map: tableEl -> { key, direction, originalOrder })
- Store original array order for "none" reset
- `resetTableState()` to clear

**`styles.js` — `_injectTableStyles()`**
- Inject `<style data-nojs-table>` once
- `th[data-sort]`: cursor pointer, user-select none
- `th[data-sort="asc"]::after`: content "▲"
- `th[data-sort="desc"]::after`: content "▼"
- `th[data-sort]::after` (unsorted): content "⇅" with lower opacity
- `[fixed-header] th`: position sticky, top 0, z-index, background (to cover scrolled content)
- `[fixed-col]`: position sticky, left 0, z-index, background

### 10.2 Unit Tests `@nojs-qa-unit-test`

**File:** `__tests__/table.test.js`

- Click on `th[sort]` sorts the context array ascending
- Second click sorts descending
- Third click resets to original order
- `sort-type="number"` uses numeric comparison
- `sort-type="date"` uses date comparison
- `sort-default="desc"` applies initial sort on init
- Only one column sorted at a time
- Context array is mutated (not replaced) so `[each]` re-renders
- ARIA: `aria-sort` updates on click
- Visual indicator: `data-sort` attribute toggles correctly
- `fixed-header`: sticky positioning applied to thead
- `fixed-col`: sticky positioning applied to matching th/td
- Cleanup: disposing resets sort state and removes listeners

### 10.3 E2E Tests `@nojs-qa-e2e`

**Files:** `e2e/tests/table.spec.ts`, `e2e/examples/table.html`

- Fixture HTML with: table with 3 sortable columns (name/string, age/number, date/date) + 1 non-sortable, `each` binding on tbody rows, fixed header, fixed first column, scrollable container
- Tests: initial unsorted state, click header sorts ascending (verify row order), click again sorts descending, click again resets, numeric sort works correctly, sort indicator arrows visible, fixed header stays on scroll, fixed column stays on horizontal scroll, data updates reflected after sort

---

## Phase 11 — Final Integration

> This phase runs AFTER all 10 element phases are complete.

### 11.1 Plugin Entry Point Update `@nojs-dev-js`

**File:** `src/index.js`

Update the plugin entry point to register all 10 new elements:

```js
import { registerDnd, cleanupDnd } from "./dnd/index.js";
import { registerTooltip, cleanupTooltip } from "./tooltip/index.js";
import { registerModal, cleanupModal } from "./modal/index.js";
import { registerDropdown, cleanupDropdown } from "./dropdown/index.js";
import { registerToast, cleanupToast } from "./toast/index.js";
import { registerTabs, cleanupTabs } from "./tabs/index.js";
import { registerTree, cleanupTree } from "./tree/index.js";
import { registerStepper, cleanupStepper } from "./stepper/index.js";
import { registerSkeleton, cleanupSkeleton } from "./skeleton/index.js";
import { registerSplit, cleanupSplit } from "./split/index.js";
import { registerTable, cleanupTable } from "./table/index.js";

const NoJSElements = {
  name: "nojs-elements",
  install(NoJS, options = {}) {
    registerDnd(NoJS, options);
    registerTooltip(NoJS, options);
    registerModal(NoJS, options);
    registerDropdown(NoJS, options);
    registerToast(NoJS, options);
    registerTabs(NoJS, options);
    registerTree(NoJS, options);
    registerStepper(NoJS, options);
    registerSkeleton(NoJS, options);
    registerSplit(NoJS, options);
    registerTable(NoJS, options);
  },
  dispose(NoJS) {
    cleanupDnd();
    cleanupTooltip();
    cleanupModal();
    cleanupDropdown();
    cleanupToast();
    cleanupTabs();
    cleanupTree();
    cleanupStepper();
    cleanupSkeleton();
    cleanupSplit();
    cleanupTable();
  },
};
export default NoJSElements;
```

### 11.2 Build Verification `@nojs-dev-js`

- Run `node build.js` — verify IIFE, ESM, CJS outputs all build without errors
- Verify bundle size is reasonable (no unexpected bloat)
- Verify CDN export (`src/cdn.js`) still works with all elements registered

### 11.3 Full Test Suite `@nojs-qa-unit-test` + `@nojs-qa-e2e`

- Run `npm test` — all unit tests pass (existing DnD tests + 10 new test files)
- Run `npx playwright test` — all E2E tests pass (existing DnD + 10 new spec files)
- No regressions in existing DnD functionality

### 11.4 Code Review `@nojs-dev-reviewer`

- Review all 10 element implementations for:
  - Consistent pattern adherence (barrel, state, styles, directive files)
  - Correct usage of NoJS plugin API (`directive()`, `findContext()`, `evaluate()`, `_onDispose()`, `_warn()`)
  - Proper cleanup/disposal (no memory leaks, all listeners removed)
  - CSS minimality (no opinionated styling, `.nojs-*` prefix)
  - Security: no `innerHTML` with user data, safe expression evaluation
  - No cross-element state leakage between modules

### 11.5 Test Review `@nojs-qa-reviewer`

- Review all 10 unit test files for:
  - Coverage completeness: all directives, attributes, keyboard interactions, ARIA
  - Edge cases: empty states, rapid interactions, disposal mid-animation
  - Mock quality: realistic event simulation, proper DOM setup/teardown
- Review all 10 E2E test files for:
  - Real browser interaction coverage
  - Fixture HTML completeness (covers all documented use cases)
  - Accessibility verification (ARIA roles, keyboard navigation)
  - No flaky selectors or timing-dependent assertions
