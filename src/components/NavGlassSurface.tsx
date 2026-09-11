import type { ComponentPropsWithoutRef } from 'react'
import './components.css'

type NavGlassSurfaceProps = ComponentPropsWithoutRef<'nav'>

export function NavGlassSurface({ children, className = '', ...props }: NavGlassSurfaceProps) {
  return (
    <nav className={`nav-glass-surface ${className}`.trim()} {...props}>
      <div className="nav-glass-surface__lens-layer" aria-hidden="true" />
      {children}
    </nav>
  )
}
