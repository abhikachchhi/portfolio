import type { GameState } from '../game/wordShift'

type GameStatusProps = {
  game: GameState
  notice: string
  puzzleLabel: string
}

export function GameStatus({ game, notice, puzzleLabel }: GameStatusProps) {
  const attempt = Math.min(game.guesses.length + 1, game.maxAttempts)

  return (
    <header className="game-status">
      <div>
        <span className="status-dot" aria-hidden="true" />
        <span>{game.status === 'playing' ? `GUESS / ${String(attempt).padStart(2, '0')}` : 'SYSTEM RESOLVED'}</span>
      </div>
      <div className="game-status__meta">
        <span>{puzzleLabel.toUpperCase()}</span>
        <span>{game.guesses.length} / {game.maxAttempts}</span>
      </div>
      <p className="game-status__notice" aria-live="polite" aria-atomic="true">
        {notice}
      </p>
    </header>
  )
}
