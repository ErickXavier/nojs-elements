// ─── Module-scoped Stepper coordination state ──────────────────────
export const _stepperRegistry = new Map(); // el → { current, steps, mode, indicatorEl, navEl }

export function resetStepperState() {
  _stepperRegistry.clear();
}
