import type { GameState } from '../../game/loopTac'
import { getExpiringCell } from '../../game/loopTac'

export function GameStatus({ state }: { state: GameState }) {
  const expiringCell = getExpiringCell(state)
  const status = state.winner
    ? state.mode === 'loop' ? `${state.winner} BREAKS THE LOOP` : `${state.winner} WINS`
    : state.draw
      ? 'DRAW'
      : state.mode === 'loop'
        ? state.moveCount < 6 ? 'Place three marks to enter the loop.' : `Oldest ${state.currentPlayer} recycles on the next move.`
        : 'Place three marks in a row.'

  return (
    <div className="loop-tac__context" aria-live="polite">
      <p className={`loop-tac__status${state.winner || state.draw ? ' is-winner' : ''}`}>{status}</p>
      {!state.winner && !state.draw && expiringCell !== null ? <p className="loop-tac__status-detail">Cell {expiringCell + 1} is the oldest active {state.currentPlayer} mark.</p> : null}
      {state.winner ? <p className="loop-tac__status-detail">{state.mode === 'loop' ? 'Three active marks' : 'Three marks'} aligned after {state.moveCount} moves.</p> : null}
      {state.draw ? <p className="loop-tac__status-detail">The board is full with no winning line.</p> : null}
    </div>
  )
}
