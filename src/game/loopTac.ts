export type Player = 'X' | 'O'
export type CellValue = Player | null
export type GameMode = 'loop' | 'classic'

export type GameState = {
  mode: GameMode
  board: CellValue[]
  currentPlayer: Player
  xHistory: number[]
  oHistory: number[]
  winner: Player | null
  draw: boolean
  winningCells: number[]
  moveCount: number
  lastMove: number | null
}

export const WINNING_COMBINATIONS: readonly (readonly number[])[] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

const otherPlayer = (player: Player): Player => player === 'X' ? 'O' : 'X'

export function createInitialGameState(mode: GameMode = 'loop'): GameState {
  return {
    mode,
    board: Array<CellValue>(9).fill(null),
    currentPlayer: 'X',
    xHistory: [],
    oHistory: [],
    winner: null,
    draw: false,
    winningCells: [],
    moveCount: 0,
    lastMove: null,
  }
}

export function isValidCellIndex(index: number): boolean {
  return Number.isInteger(index) && index >= 0 && index < 9
}

export function getWinningCells(board: readonly CellValue[], player: Player): number[] {
  return WINNING_COMBINATIONS.find((combination) => combination.every((index) => board[index] === player))?.slice() ?? []
}

export function getWinner(board: readonly CellValue[]): Player | null {
  if (getWinningCells(board, 'X').length) return 'X'
  if (getWinningCells(board, 'O').length) return 'O'
  return null
}

export function getExpiringCell(state: GameState, player: Player = state.currentPlayer): number | null {
  if (state.mode !== 'loop') return null
  const history = player === 'X' ? state.xHistory : state.oHistory
  return history.length >= 3 ? history[0] : null
}

export function makeMove(state: GameState, index: number): GameState {
  if (state.winner || state.draw || !isValidCellIndex(index) || state.board[index] !== null) return state

  const player = state.currentPlayer
  const history = player === 'X' ? state.xHistory : state.oHistory
  const nextHistory = [...history]
  const nextBoard = [...state.board]

  if (state.mode === 'loop' && nextHistory.length >= 3) nextBoard[nextHistory.shift()!] = null
  nextBoard[index] = player
  nextHistory.push(index)

  const winner = getWinner(nextBoard)
  const draw = state.mode === 'classic' && !winner && nextBoard.every(Boolean)
  const winningCells = winner ? getWinningCells(nextBoard, winner) : []

  return {
    mode: state.mode,
    board: nextBoard,
    currentPlayer: winner || draw ? player : otherPlayer(player),
    xHistory: player === 'X' ? nextHistory : [...state.xHistory],
    oHistory: player === 'O' ? nextHistory : [...state.oHistory],
    winner,
    draw,
    winningCells,
    moveCount: state.moveCount + 1,
    lastMove: index,
  }
}

export function resetGame(mode: GameMode = 'loop'): GameState {
  return createInitialGameState(mode)
}
