import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './components.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon'
  children: ReactNode
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return <button className={`button button--${variant} ${className}`.trim()} {...props}>{children}</button>
}
