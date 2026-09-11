import type { GameState } from '../../game/loopTac'
import { getExpiringCell } from '../../game/loopTac'

export function GameStatus({ state }: { state: GameState }) {
  const expiringCell = getExpiringCell(state)
  const status = state.winner ? `${state.winner} BREAKS THE LOOP` : state.moveCount < 6 ? 'Place three marks to enter the loop.' : `Oldest ${state.currentPlayer} recycles on the next move.`

  return (
    <div className="loop-tac__context" aria-live="polite">
      <p className={`loop-tac__status${state.winner ? ' is-winner' : ''}`}>{status}</p>
      {!state.winner && expiringCell !== null ? <p className="loop-tac__status-detail">Cell {expiringCell + 1} is the oldest active {state.currentPlayer} mark.</p> : null}
      {state.winner ? <p className="loop-tac__status-detail">Three active marks aligned after {state.moveCount} moves.</p> : null}
    </div>
  )
}
