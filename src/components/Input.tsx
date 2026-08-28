import type { InputHTMLAttributes } from 'react'
import './components.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }

export function Input({ label, hint, id, className = '', ...props }: InputProps) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <label className={`input-field ${className}`.trim()} htmlFor={inputId}>
      <span className="input-field__label">{label}</span>
      <input id={inputId} {...props} />
      {hint ? <span className="input-field__hint">{hint}</span> : null}
    </label>
  )
}
