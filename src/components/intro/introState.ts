export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function shouldPlayIntro() {
  return !prefersReducedMotion()
}
