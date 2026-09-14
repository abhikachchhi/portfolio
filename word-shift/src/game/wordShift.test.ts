import { describe, expect, it } from 'vitest'
import { ALLOWED_GUESSES } from '../data/words'
import {
  addLetter,
  createInitialGameState,
  evaluateGuess,
  getKeyboardState,
  getRemainingCandidates,
  isFeedbackEquivalent,
  isValidWord,
  normalizeWord,
  removeLetter,
  resetGame,
  selectDailyPuzzle,
  selectPuzzle,
  submitGuess,
  type GameState,
  type Guess,
} from './wordShift'

const allowed = ['APPLE', 'ALLEY', 'CRANE', 'SLATE', 'SHEEP', 'LEVEL', 'BRICK']
const candidates = ['APPLE', 'AMPLE', 'ANGLE', 'ALLEY', 'CRANE', 'SLATE']

function typeWord(state: GameState, word: string): GameState {
  return [...word].reduce(addLetter, state)
}

describe('word normalization and validation', () => {
  it('normalizes case and surrounding whitespace', () => {
    expect(normalizeWord('  crane ')).toBe('CRANE')
  })

  it('accepts a known five-letter word', () => {
    expect(isValidWord('crane', allowed)).toBe(true)
  })

  it('rejects non-alphabetical and unknown words', () => {
    expect(isValidWord('AB12E', allowed)).toBe(false)
    expect(isValidWord('XXXXX', allowed)).toBe(false)
  })
})

describe('guess evaluation', () => {
  it('marks exact-position matches correct', () => {
    expect(evaluateGuess('APPLE', 'APPLE').map(({ state }) => state)).toEqual(
      Array(5).fill('correct'),
    )
  })

  it('marks present letters in the wrong position', () => {
    expect(evaluateGuess('CRANE', 'REACT').map(({ state }) => state)).toEqual([
      'present', 'present', 'correct', 'present', 'absent',
    ])
  })

  it('marks absent letters', () => {
    expect(evaluateGuess('APPLE', 'BRICK').map(({ state }) => state)).toEqual(
      Array(5).fill('absent'),
    )
  })

  it('does not over-count duplicate guessed letters', () => {
    expect(evaluateGuess('APPLE', 'ALLEY').map(({ state }) => state)).toEqual([
      'correct', 'present', 'absent', 'present', 'absent',
    ])
  })

  it('handles duplicates in both solution and guess', () => {
    expect(evaluateGuess('SHEEP', 'LEVEL').map(({ state }) => state)).toEqual([
      'absent', 'present', 'absent', 'correct', 'absent',
    ])
  })
})

describe('immutable game transitions', () => {
  it('adds letters and caps the current guess at five', () => {
    const initial = createInitialGameState('APPLE')
    const typed = typeWord(initial, 'CRANES')
    expect(typed.currentGuess).toBe('CRANE')
    expect(initial.currentGuess).toBe('')
  })

  it('backspace removes the last letter', () => {
    const typed = typeWord(createInitialGameState('APPLE'), 'CRANE')
    expect(removeLetter(typed).currentGuess).toBe('CRAN')
  })

  it('rejects incomplete guesses without mutation or an attempt', () => {
    const state = typeWord(createInitialGameState('APPLE'), 'APP')
    const result = submitGuess(state, allowed, candidates)
    expect(result.error).toBe('not-enough-letters')
    expect(result.state).toBe(state)
    expect(result.state.guesses).toHaveLength(0)
  })

  it('rejects unknown guesses without mutation or an attempt', () => {
    const state = typeWord(createInitialGameState('APPLE'), 'ZZZZZ')
    const result = submitGuess(state, allowed, candidates)
    expect(result.error).toBe('word-not-found')
    expect(result.state).toBe(state)
    expect(result.state.guesses).toHaveLength(0)
  })

  it('accepts legitimate words from the generated dictionary', () => {
    expect(allowed).not.toContain('ZEBRA')
    expect(isValidWord('ZEBRA', ALLOWED_GUESSES)).toBe(true)
    expect(isValidWord('ZZZZZ', ALLOWED_GUESSES)).toBe(false)
  })

  it('submits a valid guess without mutating previous state', () => {
    const state = typeWord(createInitialGameState('APPLE'), 'CRANE')
    const result = submitGuess(state, allowed, candidates)
    expect(result.state.guesses).toHaveLength(1)
    expect(result.state.currentGuess).toBe('')
    expect(state.guesses).toEqual([])
    expect(state.currentGuess).toBe('CRANE')
  })

  it('detects a win', () => {
    const state = typeWord(createInitialGameState('APPLE'), 'APPLE')
    expect(submitGuess(state, allowed, candidates).state.status).toBe('won')
  })

  it('detects a loss after six valid failed guesses', () => {
    let state = createInitialGameState('APPLE')
    for (let attempt = 0; attempt < 6; attempt += 1) {
      state = typeWord(state, 'CRANE')
      state = submitGuess(state, allowed, candidates).state
    }
    expect(state.status).toBe('lost')
    expect(state.guesses).toHaveLength(6)
  })

  it.each(['won', 'lost'] as const)('stops accepting input after %s', (status) => {
    const state = { ...createInitialGameState('APPLE'), status }
    expect(addLetter(state, 'A')).toBe(state)
    expect(removeLetter(state)).toBe(state)
    expect(submitGuess(state, allowed, candidates).state).toBe(state)
  })

  it('reset restores the initial state and keeps its puzzle identity', () => {
    const played = {
      ...typeWord(createInitialGameState('APPLE', '004'), 'CRANE'),
      candidateHistory: [12],
    }
    expect(resetGame(played)).toEqual(createInitialGameState('APPLE', '004'))
  })
})

describe('keyboard knowledge', () => {
  const correctGuess: Guess = {
    word: 'APPLE',
    result: evaluateGuess('APPLE', 'APPLE'),
  }
  const earlierGuess: Guess = {
    word: 'ALLEY',
    result: evaluateGuess('APPLE', 'ALLEY'),
  }

  it('records evaluated keyboard states', () => {
    expect(getKeyboardState([earlierGuess])).toMatchObject({
      A: 'correct', L: 'present', E: 'present', Y: 'absent',
    })
  })

  it('upgrades a key to stronger knowledge', () => {
    expect(getKeyboardState([earlierGuess, correctGuess]).L).toBe('correct')
  })

  it('never downgrades a key', () => {
    expect(getKeyboardState([correctGuess, earlierGuess]).L).toBe('correct')
  })
})

describe('candidate filtering', () => {
  const actualResult = evaluateGuess('APPLE', 'ALLEY')
  const guess: Guess = { word: 'ALLEY', result: actualResult }

  it('recognizes equivalent feedback', () => {
    expect(isFeedbackEquivalent('APPLE', 'ALLEY', actualResult)).toBe(true)
  })

  it('always preserves the actual solution', () => {
    expect(getRemainingCandidates(candidates, [guess])).toContain('APPLE')
  })

  it('removes candidates with incompatible feedback', () => {
    const remaining = getRemainingCandidates(candidates, [guess])
    expect(remaining).not.toContain('CRANE')
    expect(remaining).not.toContain('ALLEY')
  })

  it('handles duplicate-letter constraints exactly', () => {
    const duplicateGuess: Guess = {
      word: 'SHEEP',
      result: evaluateGuess('LEVEL', 'SHEEP'),
    }
    const remaining = getRemainingCandidates(['LEVEL', 'SHEEP', 'APPLE'], [duplicateGuess])
    expect(remaining).toEqual(['LEVEL'])
  })
})

describe('puzzle selection', () => {
  const puzzles = [
    { id: '001', solution: 'APPLE' },
    { id: '002', solution: 'CRANE' },
  ]

  it('selects an archive puzzle by id', () => {
    expect(selectPuzzle(puzzles, '002')?.solution).toBe('CRANE')
  })

  it('selects a stable puzzle for the same local date', () => {
    const date = new Date(2026, 8, 13, 23, 30)
    expect(selectDailyPuzzle(puzzles, date)).toBe(selectDailyPuzzle(puzzles, date))
  })

  it('requires at least one daily puzzle', () => {
    expect(() => selectDailyPuzzle([], new Date())).toThrow()
  })
})
