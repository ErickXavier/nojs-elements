import { registerStepper } from "./stepper.js";
import { registerStep } from "./step.js";
import { resetStepperState } from "./state.js";

export function registerStepperModule(NoJS, options = {}) {
  registerStep(NoJS);
  registerStepper(NoJS);
}

export function cleanupStepper() {
  resetStepperState();
}
