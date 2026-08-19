export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDesktopMotion() {
  return window.matchMedia("(min-width: 768px)").matches;
}

export function canAnimate(desktopOnly = false) {
  if (prefersReducedMotion()) return false;
  if (desktopOnly && !isDesktopMotion()) return false;
  return true;
}
