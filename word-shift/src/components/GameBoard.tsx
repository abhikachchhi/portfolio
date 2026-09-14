import type { CSSProperties } from 'react'
import { WORD_LENGTH, type GameState, type LetterState } from '../game/wordShift'

type GameBoardProps = {
  game: GameState
  invalidPulse: number
}

const stateLabel: Record<LetterState, string> = {
  correct: 'correct position',
  present: 'present in word but wrong position',
  absent: 'not in word',
}

export function GameBoard({ game, invalidPulse }: GameBoardProps) {
  return (
    <div
      className={`board${invalidPulse > 0 ? ' board--invalid' : ''}`}
      role="grid"
      aria-label="Six-row word deduction board"
      key={`${game.puzzleId ?? game.solution}-${invalidPulse}`}
    >
      {Array.from({ length: game.maxAttempts }, (_, rowIndex) => {
        const submitted = game.guesses[rowIndex]
        const isActive = rowIndex === game.guesses.length && game.status === 'playing'
        const letters = submitted?.word ?? (isActive ? game.currentGuess : '')

        return (
          <div className="board__row" role="row" key={rowIndex}>
            {Array.from({ length: WORD_LENGTH }, (_, columnIndex) => {
              const evaluated = submitted?.result[columnIndex]
              const letter = letters[columnIndex] ?? ''
              const ariaLabel = evaluated
                ? `Row ${rowIndex + 1}, letter ${letter}, ${stateLabel[evaluated.state]}`
                : letter
                  ? `Row ${rowIndex + 1}, letter ${letter}, not submitted`
                  : `Row ${rowIndex + 1}, column ${columnIndex + 1}, empty`
              const style = { '--tile-index': columnIndex } as CSSProperties

              return (
                <div
                  className={[
                    'tile',
                    letter ? 'tile--filled' : '',
                    isActive ? 'tile--active' : '',
                    evaluated ? `tile--${evaluated.state} tile--evaluated` : '',
                  ].filter(Boolean).join(' ')}
                  role="gridcell"
                  aria-label={ariaLabel}
                  style={style}
                  key={columnIndex}
                >
                  <span className="tile__letter" aria-hidden="true">{letter}</span>
                  {evaluated && (
                    <span className="tile__signal" aria-hidden="true">
                      {evaluated.state === 'correct' ? '=' : evaluated.state === 'present' ? '~' : '×'}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
