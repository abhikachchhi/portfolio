import type { CellValue, Player } from '../../game/loopTac'

type GameCellProps = {
  index: number
  value: CellValue
  currentPlayer: Player
  expiring: boolean
  winning: boolean
  lastMove: boolean
  disabled: boolean
  onSelect: (index: number) => void
}

export function GameCell({ index, value, currentPlayer, expiring, winning, lastMove, disabled, onSelect }: GameCellProps) {
  const valueLabel = value ? `occupied by ${value}` : 'empty'
  const expiringLabel = expiring ? `, expires on next ${currentPlayer} move` : ''

  return (
    <button
      className={`loop-tac__cell loop-tac__cell--${value ?? 'empty'}${expiring ? ' is-expiring' : ''}${winning ? ' is-winning' : ''}${lastMove ? ' is-last-move' : ''}`}
      type="button"
      aria-label={`Cell ${index + 1}, ${valueLabel}${expiringLabel}`}
      disabled={disabled}
      onClick={() => onSelect(index)}
    >
      {value ? <span aria-hidden="true">{value}</span> : null}
    </button>
  )
}
