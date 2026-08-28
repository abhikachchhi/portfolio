import type { HTMLAttributes, ReactNode } from 'react'
import './components.css'

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  variant?: 'subtle' | 'elevated' | 'interactive'
}

export function GlassPanel({ children, variant = 'subtle', className = '', ...props }: GlassPanelProps) {
  return (
    <div className={`glass-panel glass-panel--${variant} ${className}`.trim()} {...props}>
      <span className="glass-panel__lens-layer" aria-hidden="true" />
      {children}
    </div>
  )
}
