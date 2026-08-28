import { useLayoutEffect, useRef, type ComponentPropsWithoutRef } from 'react'
import './components.css'

type NavGlassSurfaceProps = ComponentPropsWithoutRef<'nav'> & { contentKey?: string }

export function NavGlassSurface({ children, className = '', contentKey, ...props }: NavGlassSurfaceProps) {
  const surfaceRef = useRef<HTMLElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const surface = surfaceRef.current
    const lens = lensRef.current
    const source = document.querySelector<HTMLElement>('main')

    if (!surface || !lens || !source) return

    const clone = document.createElement('div')
    clone.replaceChildren(...Array.from(source.childNodes, (node) => node.cloneNode(true)))
    clone.classList.add('nav-glass-surface__dom-clone')
    clone.setAttribute('aria-hidden', 'true')

    clone.querySelectorAll<HTMLElement>('[id]').forEach((element) => element.removeAttribute('id'))
    clone.querySelectorAll<HTMLElement>('a, button, input').forEach((element) => element.setAttribute('tabindex', '-1'))
    clone.querySelectorAll<HTMLElement>('.nav-glass-surface__lens-layer').forEach((element) => element.replaceChildren())
    lens.replaceChildren(clone)

    let frame = 0
    let settleFrames = 0

    const syncLens = () => {
      const surfaceRect = surface.getBoundingClientRect()
      const sourceRect = source.getBoundingClientRect()
      const magnification = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--glass-magnification'),
      ) || 1
      const focusX = surfaceRect.left - sourceRect.left
      const focusY = surfaceRect.top + surfaceRect.height / 2 - sourceRect.top
      const edgeEntryCompensation = Math.max(0, magnification - 1) * surfaceRect.height / 2

      clone.style.width = `${sourceRect.width}px`
      clone.style.height = `${source.scrollHeight}px`
      clone.style.left = `${sourceRect.left - surfaceRect.left}px`
      clone.style.top = `${sourceRect.top - surfaceRect.top - edgeEntryCompensation}px`
      clone.style.transformOrigin = `${focusX}px ${focusY}px`
      clone.style.transform = `scale(${magnification})`
    }

    const settleLens = () => {
      syncLens()
      settleFrames -= 1

      if (settleFrames > 0) frame = requestAnimationFrame(settleLens)
      else frame = 0
    }

    const handleScroll = () => {
      syncLens()
      settleFrames = 4
      if (!frame) frame = requestAnimationFrame(settleLens)
    }

    const resizeObserver = new ResizeObserver(syncLens)
    resizeObserver.observe(source)
    resizeObserver.observe(surface)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', syncLens)
    syncLens()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', syncLens)
      lens.replaceChildren()
    }
  }, [contentKey])

  return (
    <nav ref={surfaceRef} className={`nav-glass-surface ${className}`.trim()} {...props}>
      <div ref={lensRef} className="nav-glass-surface__lens-layer" aria-hidden="true" />
      {children}
    </nav>
  )
}
