import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

type HeroPulse = { id: number; x: number; y: number }

type MotionPoint = { x: number; y: number; lensX: number; lensY: number }

const restingPoint: MotionPoint = { x: 0, y: 0, lensX: 0, lensY: 0 }

export function useInteractiveHero() {
  const heroRef = useRef<HTMLElement>(null)
  const frameRef = useRef<number | null>(null)
  const scrollFrameRef = useRef<number | null>(null)
  const lastFrameRef = useRef(0)
  const targetRef = useRef<MotionPoint>({ ...restingPoint })
  const currentRef = useRef<MotionPoint>({ ...restingPoint })
  const finePointerRef = useRef(false)
  const reducedMotionRef = useRef(false)
  const activeGlassRef = useRef<HTMLElement | null>(null)
  const [pulse, setPulse] = useState<HeroPulse | null>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreferences = () => {
      finePointerRef.current = finePointer.matches
      reducedMotionRef.current = reducedMotion.matches
    }

    const updateScroll = () => {
      scrollFrameRef.current = null
      if (reducedMotionRef.current) {
        hero.style.setProperty('--hero-scroll-title-y', '0px')
        hero.style.setProperty('--hero-scroll-copy-y', '0px')
        hero.style.setProperty('--hero-scroll-opacity', '1')
        return
      }

      const bounds = hero.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(bounds.height * 0.78, 1)))
      const mobile = window.matchMedia('(max-width: 700px)').matches
      hero.style.setProperty('--hero-scroll-title-y', `${progress * (mobile ? 10 : 28)}px`)
      hero.style.setProperty('--hero-scroll-copy-y', `${progress * (mobile ? -3 : -8)}px`)
      hero.style.setProperty('--hero-scroll-opacity', `${1 - progress * 0.18}`)
    }

    const requestScrollUpdate = () => {
      if (scrollFrameRef.current === null) scrollFrameRef.current = requestAnimationFrame(updateScroll)
    }

    updatePreferences()
    updateScroll()
    finePointer.addEventListener('change', updatePreferences)
    reducedMotion.addEventListener('change', updatePreferences)
    reducedMotion.addEventListener('change', requestScrollUpdate)
    window.addEventListener('scroll', requestScrollUpdate, { passive: true })
    window.addEventListener('resize', requestScrollUpdate, { passive: true })

    return () => {
      finePointer.removeEventListener('change', updatePreferences)
      reducedMotion.removeEventListener('change', updatePreferences)
      reducedMotion.removeEventListener('change', requestScrollUpdate)
      window.removeEventListener('scroll', requestScrollUpdate)
      window.removeEventListener('resize', requestScrollUpdate)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current)
    }
  }, [])

  const renderPointerMotion = (time: number) => {
    const hero = heroRef.current
    if (!hero) return

    const elapsed = lastFrameRef.current ? Math.min((time - lastFrameRef.current) / 1000, 0.05) : 1 / 60
    lastFrameRef.current = time
    const current = currentRef.current
    const target = targetRef.current
    const damping = 1 - Math.exp(-elapsed * 8.5)

    current.x += (target.x - current.x) * damping
    current.y += (target.y - current.y) * damping
    current.lensX += (target.lensX - current.lensX) * damping
    current.lensY += (target.lensY - current.lensY) * damping

    hero.style.setProperty('--hero-line-one-x', `${current.x * 8}px`)
    hero.style.setProperty('--hero-line-one-y', `${current.y * 5}px`)
    hero.style.setProperty('--hero-line-two-x', `${current.x * -5}px`)
    hero.style.setProperty('--hero-line-two-y', `${current.y * -3}px`)
    hero.style.setProperty('--hero-lens-x', `${current.lensX}px`)
    hero.style.setProperty('--hero-lens-y', `${current.lensY}px`)

    const unsettled = Math.abs(target.x - current.x) + Math.abs(target.y - current.y)
      + Math.abs(target.lensX - current.lensX) + Math.abs(target.lensY - current.lensY) > 0.35

    if (unsettled) frameRef.current = requestAnimationFrame(renderPointerMotion)
    else {
      frameRef.current = null
      lastFrameRef.current = 0
    }
  }

  const requestPointerUpdate = () => {
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(renderPointerMotion)
  }

  const resetGlass = () => {
    activeGlassRef.current?.style.setProperty('--hero-glass-strength', '0')
    activeGlassRef.current = null
  }

  const updateGlass = (event: ReactPointerEvent<HTMLElement>) => {
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-hero-glass]') : null
    if (target !== activeGlassRef.current) resetGlass()
    if (!target) return

    const bounds = target.getBoundingClientRect()
    target.style.setProperty('--hero-glass-x', `${event.clientX - bounds.left}px`)
    target.style.setProperty('--hero-glass-y', `${event.clientY - bounds.top}px`)
    target.style.setProperty('--hero-glass-strength', '1')
    activeGlassRef.current = target
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reducedMotionRef.current || !finePointerRef.current) return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.querySelector('.home-hero__liquid-lens')?.classList.remove('is-popping')
    const lensX = event.clientX - bounds.left
    const lensY = event.clientY - bounds.top
    if (currentRef.current.lensX === 0 && currentRef.current.lensY === 0) {
      currentRef.current.lensX = lensX
      currentRef.current.lensY = lensY
    }
    targetRef.current = {
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
      lensX,
      lensY,
    }
    event.currentTarget.style.setProperty('--hero-lens-opacity', '1')
    updateGlass(event)
    requestPointerUpdate()
  }

  const onPointerLeave = () => {
    targetRef.current = { ...restingPoint, lensX: currentRef.current.lensX, lensY: currentRef.current.lensY }
    const hero = heroRef.current
    const lens = hero?.querySelector('.home-hero__liquid-lens')
    if (hero && lens) {
      hero.style.setProperty('--hero-lens-opacity', '1')
      lens.classList.remove('is-popping')
      void lens.getBoundingClientRect()
      lens.classList.add('is-popping')
    }
    resetGlass()
    requestPointerUpdate()
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    setPulse({ id: performance.now(), x: event.clientX - bounds.left, y: event.clientY - bounds.top })
  }

  return {
    heroRef,
    pulse,
    clearPulse: () => setPulse(null),
    interactionProps: { onPointerMove, onPointerLeave, onPointerDown },
  }
}
