// ─── Stepper ↔ Validation gate ──────────────────────────────────────
// When a [step] element has the `stepper-validate` attribute and
// contains a <form validate> element, forward navigation is blocked
// until $form.valid is true.  Backward navigation is never blocked.
// ─────────────────────────────────────────────────────────────────────

/**
 * Check if a step passes its validation gate.
 *
 * @param {Element}  stepEl  – The [step] element to validate
 * @param {Function} findCtx – NoJS.findContext
 * @returns {boolean} true if the step may advance
 */
export function checkStepValidationGate(stepEl, findCtx) {
  // Gate only applies when the attribute is present
  if (!stepEl.hasAttribute("stepper-validate")) return true;

  const form = stepEl.querySelector("form[validate]");
  if (!form) return true; // no validated form → nothing to gate

  // Resolve $form from the form element's NoJS context
  const formCtx = findCtx(form);
  const $form = formCtx?.$form;
  if (!$form) return true; // validate directive hasn't run yet

  return !!$form.valid;
}

/**
 * Touch all fields inside a validated form so errors become visible.
 *
 * @param {Element} form – The <form validate> element
 */
export function touchAllFields(form) {
  const fields = form.querySelectorAll("input, textarea, select");
  for (const field of fields) {
    // Dispatch focusout to trigger the validate directive's touch handler
    field.dispatchEvent(new Event("focusout", { bubbles: true }));
  }
}

/**
 * Dispatch the stepper:validation-blocked event on the stepper container.
 *
 * @param {Element} stepperEl – The [stepper] container
 * @param {Element} stepEl    – The blocked [step]
 * @param {Element} form      – The invalid <form validate>
 */
export function dispatchValidationBlocked(stepperEl, stepEl, form) {
  stepperEl.dispatchEvent(
    new CustomEvent("stepper:validation-blocked", {
      bubbles: true,
      detail: { step: stepEl, form },
    })
  );
}
