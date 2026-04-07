import { registerSkeletonDirective } from "./skeleton.js";

export function registerSkeleton(NoJS, options = {}) {
  registerSkeletonDirective(NoJS);
}

export function cleanupSkeleton() {
  // No shared state to reset
}
