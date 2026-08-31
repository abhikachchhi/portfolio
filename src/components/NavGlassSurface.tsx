import { useLayoutEffect, useRef, type ComponentPropsWithoutRef } from 'react'
import './components.css'

type NavGlassSurfaceProps = ComponentPropsWithoutRef<'nav'> & { contentKey?: string }

export function NavGlassSurface({ children, className = '', contentKey, ...props }: NavGlassSurfaceProps) {
  const surfaceRef = useRef<HTMLElement>(null)
  const refractionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const surface = surfaceRef.current
    const refraction = refractionRef.current
    const source = document.querySelector<HTMLElement>('main')
    if (!surface || !refraction || !source) return

    const clone = document.createElement('div')
    const clonedNodes = Array.from(source.childNodes, (node) => node.cloneNode(true))
    const cloneMap = new WeakMap<Node, Node>()
    const mapClonedTree = (liveNode: Node, clonedNode: Node) => {
      cloneMap.set(liveNode, clonedNode)
      liveNode.childNodes.forEach((child, index) => {
        const clonedChild = clonedNode.childNodes[index]
        if (clonedChild) mapClonedTree(child, clonedChild)
      })
    }

    source.childNodes.forEach((node, index) => mapClonedTree(node, clonedNodes[index]))
    clone.replaceChildren(...clonedNodes)
    clone.className = 'nav-glass-surface__edge-clone'
    clone.setAttribute('aria-hidden', 'true')
    clone.querySelectorAll<HTMLElement>('[id]').forEach((element) => element.removeAttribute('id'))
    clone.querySelectorAll<HTMLElement>('a, button, input').forEach((element) => element.setAttribute('tabindex', '-1'))
    refraction.replaceChildren(clone)

    let frame = 0
    const syncRefraction = () => {
      frame = 0
      const surfaceRect = surface.getBoundingClientRect()
      const sourceRect = source.getBoundingClientRect()
      const magnification = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-glass-magnification')) || 1
      const focusX = surfaceRect.left - sourceRect.left + surfaceRect.width / 2
      const focusY = surfaceRect.top - sourceRect.top + surfaceRect.height / 2

      clone.style.width = `${sourceRect.width}px`
      clone.style.height = `${source.scrollHeight}px`
      clone.style.left = `${sourceRect.left - surfaceRect.left}px`
      clone.style.top = `${sourceRect.top - surfaceRect.top}px`
      clone.style.transformOrigin = `${focusX}px ${focusY}px`
      clone.style.transform = `scale(${magnification})`
    }
    const requestSync = () => {
      if (!frame) frame = requestAnimationFrame(syncRefraction)
    }

    const resizeObserver = new ResizeObserver(requestSync)
    const motionObserver = new MutationObserver((mutations) => {
      mutations.forEach(({ target, attributeName }) => {
        if (!attributeName) return
        const clonedTarget = cloneMap.get(target)
        if (!(target instanceof Element) || !(clonedTarget instanceof Element)) return
        const value = target.getAttribute(attributeName)
        if (value === null) clonedTarget.removeAttribute(attributeName)
        else clonedTarget.setAttribute(attributeName, value)
      })
    })

    resizeObserver.observe(source)
    resizeObserver.observe(surface)
    motionObserver.observe(source, { subtree: true, attributes: true, attributeFilter: ['style', 'class'] })
    window.addEventListener('scroll', requestSync, { passive: true })
    window.addEventListener('resize', requestSync, { passive: true })
    syncRefraction()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      motionObserver.disconnect()
      window.removeEventListener('scroll', requestSync)
      window.removeEventListener('resize', requestSync)
      refraction.replaceChildren()
    }
  }, [contentKey])

  return (
    <nav ref={surfaceRef} className={`nav-glass-surface ${className}`.trim()} {...props}>
      <div ref={refractionRef} className="nav-glass-surface__edge-refraction" aria-hidden="true" />
      <div className="nav-glass-surface__lens-layer" aria-hidden="true" />
      {children}
    </nav>
  )
}
