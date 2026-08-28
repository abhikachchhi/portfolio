import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './components.css'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  children: ReactNode
}

export function IconButton({ label, children, className = '', ...props }: IconButtonProps) {
  return (
    <button className={`icon-button ${className}`.trim()} aria-label={label} title={label} {...props}>
      <span aria-hidden="true">{children}</span>
    </button>
  )
}
