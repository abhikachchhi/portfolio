import type { HTMLAttributes, ReactNode } from 'react'
import './components.css'

type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  accent?: 'neutral' | 'violet' | 'cyan'
  variant?: 'mist' | 'bevel' | 'outline' | 'solid' | 'indicator' | 'inset' | 'inset-a' | 'inset-b' | 'inset-c' | 'inset-d' | 'inset-e' | 'inset-f' | 'inset-g' | 'inset-h' | 'prism'
}

export function Chip({ children, accent = 'neutral', variant = 'inset-d', className = '', ...props }: ChipProps) {
  return <span className={`chip chip--${accent} chip--${variant} ${className}`.trim()} {...props}>{children}</span>
}
