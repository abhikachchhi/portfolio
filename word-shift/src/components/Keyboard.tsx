import type { LetterState } from '../game/wordShift'

type KeyboardProps = {
  keyStates: Partial<Record<string, LetterState>>
  disabled: boolean
  onInput: (key: string) => void
}

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
]

const stateLabel: Record<LetterState, string> = {
  correct: 'correct position',
  present: 'present in word but wrong position',
  absent: 'not in word',
}

export function Keyboard({ keyStates, disabled, onInput }: KeyboardProps) {
  return (
    <div className="keyboard" aria-label="On-screen keyboard">
      {rows.map((row, rowIndex) => (
        <div className="keyboard__row" key={rowIndex}>
          {row.map((key) => {
            const state = keyStates[key]
            const isAction = key === 'ENTER' || key === 'BACKSPACE'
            const label = key === 'BACKSPACE'
              ? 'Delete last letter'
              : key === 'ENTER'
                ? 'Submit guess'
                : `Letter ${key}${state ? `, ${stateLabel[state]}` : ''}`

            return (
              <button
                className={[
                  'key',
                  isAction ? 'key--action' : '',
                  state ? `key--${state}` : '',
                ].filter(Boolean).join(' ')}
                type="button"
                onClick={() => onInput(key)}
                disabled={disabled}
                aria-label={label}
                key={key}
              >
                {key === 'BACKSPACE' ? <span aria-hidden="true">⌫</span> : key}
                {state && <span className="key__signal" aria-hidden="true" />}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
