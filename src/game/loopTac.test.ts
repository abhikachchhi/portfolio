import { describe, expect, it } from 'vitest'
import { createInitialGameState, getExpiringCell, getWinner, makeMove, resetGame } from './loopTac'

const play = (state: ReturnType<typeof createInitialGameState>, moves: number[]) => moves.reduce(makeMove, state)

describe('LOOP/TAC rules', () => {
  it('alternates X and O on valid moves', () => {
    const state = play(createInitialGameState(), [0, 3])
    expect(state.board[0]).toBe('X')
    expect(state.board[3]).toBe('O')
    expect(state.currentPlayer).toBe('X')
  })

  it('rejects occupied cells and invalid indices without mutating state', () => {
    const state = makeMove(createInitialGameState(), 0)
    expect(makeMove(state, 0)).toBe(state)
    expect(makeMove(state, -1)).toBe(state)
    expect(makeMove(state, 9)).toBe(state)
    expect(makeMove(state, 1.5)).toBe(state)
  })

  it('keeps at most three active marks for each player', () => {
    const state = play(createInitialGameState(), [0, 3, 1, 4, 5, 2])
    expect(state.xHistory).toHaveLength(3)
    expect(state.oHistory).toHaveLength(3)
  })

  it('recycles X oldest mark on X fourth move', () => {
    const state = play(createInitialGameState(), [0, 3, 1, 4, 5, 6, 8])
    expect(state.board).toEqual([null, 'X', null, 'O', 'O', 'X', 'O', null, 'X'])
    expect(state.xHistory).toEqual([1, 5, 8])
    expect(state.oHistory).toEqual([3, 4, 6])
  })

  it('recycles O oldest mark independently on O fourth move', () => {
    const state = play(createInitialGameState(), [0, 1, 3, 4, 8, 2, 6, 5])
    expect(state.board[1]).toBeNull()
    expect(state.board[5]).toBe('O')
    expect(state.xHistory).toEqual([3, 8, 6])
    expect(state.oHistory).toEqual([4, 2, 5])
  })

  it('continues FIFO order after recycling', () => {
    const state = play(createInitialGameState(), [0, 3, 1, 4, 5, 6, 8, 7])
    const next = makeMove(state, 2)
    expect(next.xHistory).toEqual([5, 8, 2])
    expect(next.board[1]).toBeNull()
    expect(next.board[2]).toBe('X')
  })

  it('detects a winner from active pieces after recycling', () => {
    const state = play(createInitialGameState(), [3, 4, 0, 5, 1, 6, 2])
    expect(state.winner).toBe('X')
    expect(state.winningCells).toEqual([0, 1, 2])
    expect(getWinner(state.board)).toBe('X')
  })

  it('has no draw state and stops after a winner', () => {
    const state = play(createInitialGameState(), [0, 3, 1, 4, 2])
    expect(state.winner).toBe('X')
    expect(makeMove(state, 5)).toBe(state)
  })

  it('resets completely', () => {
    const state = play(createInitialGameState(), [0, 3, 1])
    expect(resetGame()).toEqual(createInitialGameState())
    expect(state.moveCount).toBe(3)
  })

  it('identifies the current player oldest mark for recycling', () => {
    const state = play(createInitialGameState(), [0, 3, 1, 4, 5, 6])
    expect(getExpiringCell(state, 'X')).toBe(0)
    expect(getExpiringCell(state, 'O')).toBe(3)
    expect(getExpiringCell(createInitialGameState())).toBeNull()
  })
})
