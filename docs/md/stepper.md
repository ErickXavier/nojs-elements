# Stepper

## `stepper` — Multi-Step Container

```html
<!-- Basic stepper (linear mode, validates before advancing) -->
<div stepper>
  <div step>
    <h3>Personal Info</h3>
    <input model="name" required />
    <input model="email" type="email" required />
  </div>
  <div step>
    <h3>Address</h3>
    <input model="street" required />
    <input model="city" required />
  </div>
  <div step>
    <h3>Confirmation</h3>
    <p>Name: <span bind="name"></span></p>
    <p>Email: <span bind="email"></span></p>
  </div>
</div>

<!-- Start on a specific step (0-based index) -->
<div stepper="1">
  <div step>Step 1</div>
  <div step>Step 2 (shown first)</div>
</div>

<!-- Free mode (any step clickable in the indicator) -->
<div stepper stepper-mode="free">
  <div step step-label="Account">...</div>
  <div step step-label="Profile">...</div>
  <div step step-label="Review">...</div>
</div>

<!-- Hide indicator or navigation buttons -->
<div stepper stepper-indicator="false" stepper-nav="false">
  <div step>Manual control only</div>
  <div step>Use $stepper API</div>
</div>
```

### Stepper Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `stepper` | number | `0` | Initial step index (0-based) |
| `stepper-mode` | `"linear"` \| `"free"` | `"linear"` | Navigation mode. Linear validates before advancing; free allows clicking any step |
| `stepper-indicator` | `"true"` \| `"false"` | `"true"` | Show/hide the progress indicator |
| `stepper-nav` | `"true"` \| `"false"` | `"true"` | Show/hide Previous/Next buttons |
| `aria-label` | string | `"Stepper"` | Accessible label for the stepper container |

---

## `step` — Step Content Panel

Each direct child with the `step` attribute defines one step panel.

```html
<div stepper>
  <!-- Basic step (indicator shows "Step 1") -->
  <div step>
    <h3>Details</h3>
    <input model="details" required />
  </div>

  <!-- Custom label in the progress indicator -->
  <div step step-label="Payment">
    <h3>Payment Method</h3>
    <input model="card" required />
  </div>

  <!-- Custom validation expression -->
  <div step step-label="Review" step-validate="age >= 18">
    <p>You must be 18+ to continue.</p>
  </div>
</div>
```

### Step Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `step` | — | — | Marks the element as a step panel |
| `step-label` | string | `"Step N"` | Custom label shown in the progress indicator |
| `step-validate` | expression | — | Expression that must be truthy for the step to pass validation (linear mode). Checked in addition to `required` inputs |

---

## `$stepper` Context API

Inside any `stepper` container, the `$stepper` object is available in expressions:

```html
<div stepper>
  <div step step-label="Info">
    <h3>Step <span bind="$stepper.current + 1"></span> of <span bind="$stepper.total"></span></h3>
    <input model="name" required />
  </div>

  <div step step-label="Done">
    <p>All done!</p>
  </div>

  <!-- Custom navigation using the API -->
  <button on:click="$stepper.prev()" disabled="$stepper.isFirst">Back</button>
  <button on:click="$stepper.next()" hidden="$stepper.isLast">Continue</button>
  <button on:click="submitForm()" show="$stepper.isLast">Submit</button>
</div>
```

### API Properties

| Property | Type | Description |
|----------|------|-------------|
| `$stepper.current` | number | Current step index (0-based) |
| `$stepper.total` | number | Total number of steps |
| `$stepper.isFirst` | boolean | `true` when on the first step |
| `$stepper.isLast` | boolean | `true` when on the last step |

### API Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `$stepper.next()` | boolean | Advance to the next step. In linear mode, validates the current step first. Returns `false` if validation fails or already on the last step |
| `$stepper.prev()` | boolean | Go back to the previous step. Returns `false` if already on the first step |
| `$stepper.goTo(index)` | boolean | Jump to a specific step. In linear mode, validates all intermediate steps when moving forward. Returns `false` if out of bounds or validation fails |

---

## Events

| Event | `$event.detail` | Description |
|-------|-----------------|-------------|
| `step-change` | `{ current, total }` | Dispatched on the stepper element whenever the active step changes |

```html
<div stepper on:step-change="console.log('Step', $event.detail.current + 1)">
  <div step>Step 1</div>
  <div step>Step 2</div>
</div>
```

---

## Linear Mode with Validation

In `linear` mode (the default), the stepper validates the current step before allowing forward navigation. Validation checks:

1. All `[required]` inputs within the step via `checkValidity()` / `reportValidity()`
2. The `step-validate` expression (if present) must evaluate to a truthy value

```html
<div stepper>
  <!-- Step 1: required inputs must be filled -->
  <div step step-label="Account">
    <input model="username" required placeholder="Username" />
    <input model="password" type="password" required placeholder="Password" />
  </div>

  <!-- Step 2: custom expression validation -->
  <div step step-label="Terms" step-validate="acceptedTerms">
    <label>
      <input type="checkbox" model="acceptedTerms" />
      I accept the terms and conditions
    </label>
  </div>

  <!-- Step 3: no validation needed -->
  <div step step-label="Confirm">
    <p>Welcome, <span bind="username"></span>!</p>
  </div>
</div>
```

Going **backward** never requires validation. Using `$stepper.goTo(index)` forward in linear mode validates all intermediate steps sequentially.

---

## Free Mode

In `free` mode, every step in the progress indicator becomes clickable, allowing users to jump to any step without validation.

```html
<div stepper stepper-mode="free">
  <div step step-label="General">
    <h3>General Settings</h3>
    <input model="siteName" placeholder="Site name" />
  </div>
  <div step step-label="Theme">
    <h3>Theme Settings</h3>
    <input model="primaryColor" type="color" />
  </div>
  <div step step-label="Advanced">
    <h3>Advanced Settings</h3>
    <input model="cacheTimeout" type="number" />
  </div>
</div>
```

---

## CSS Classes

No.JS Elements automatically injects these classes:

| Class | When applied |
|-------|-------------|
| `.nojs-stepper` | On the stepper container |
| `.nojs-stepper-indicator` | On the generated progress indicator bar |
| `.nojs-stepper-indicator-item` | On each step button in the indicator |
| `.nojs-stepper-indicator-item[aria-selected="true"]` | On the active step indicator (bold number) |
| `.nojs-stepper-indicator-item[data-completed]` | On completed steps (shows checkmark instead of number) |
| `.nojs-stepper-indicator-item[data-clickable]` | On clickable steps in free mode |
| `.nojs-stepper-separator` | On the line between indicator items |
| `.nojs-step` | On each step panel |
| `.nojs-step[aria-hidden="true"]` | On inactive step panels (`display: none`) |
| `.nojs-stepper-nav` | On the navigation button container |
| `.nojs-stepper-prev` | On the Previous button |
| `.nojs-stepper-next` | On the Next button (text changes to "Finish" on the last step) |

---

## Accessibility

No.JS Elements automatically adds:

- `role="group"` and `aria-label` on the stepper container
- `role="tablist"` on the progress indicator
- `role="tab"` with `aria-selected` on each indicator item
- `role="tabpanel"` on each step panel
- `aria-controls` / `aria-labelledby` linking tabs to panels
- `aria-hidden="true"` and `inert` on inactive step panels
- `tabindex="0"` on the active indicator and step panels
- Roving tabindex across indicator items

### Keyboard Navigation

- **Arrow Right** / **Arrow Left** — move focus between indicator items (navigates in free mode)
- **Home** — move focus to the first indicator item
- **End** — move focus to the last indicator item

---

**Next:** [Skeleton →](skeleton.md)
