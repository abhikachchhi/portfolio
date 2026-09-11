import type { GameState } from '../../game/loopTac'
import { getExpiringCell } from '../../game/loopTac'
import { GameCell } from './GameCell'

export function GameBoard({ state, onSelect }: { state: GameState; onSelect: (index: number) => void }) {
  const expiringCell = getExpiringCell(state)

  return (
    <div className={`loop-tac__board loop-tac__board--${state.currentPlayer}`} aria-label="LOOP/TAC game board">
      {state.board.map((value, index) => <GameCell key={index} index={index} value={value} currentPlayer={state.currentPlayer} expiring={expiringCell === index} winning={state.winningCells.includes(index)} lastMove={state.lastMove === index} disabled={Boolean(value || state.winner)} onSelect={onSelect} />)}
    </div>
  )
}
