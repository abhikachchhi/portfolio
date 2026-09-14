export type LetterState = 'correct' | 'present' | 'absent'

export type EvaluatedLetter = {
  letter: string
  state: LetterState
}

export type Guess = {
  word: string
  result: EvaluatedLetter[]
}

export type GameStatus = 'playing' | 'won' | 'lost'

export type GameState = {
  solution: string
  guesses: Guess[]
  currentGuess: string
  status: GameStatus
  maxAttempts: number
  candidateHistory: number[]
  puzzleId?: string
}

export type SubmitError = 'not-enough-letters' | 'word-not-found' | null

export type SubmitResult = {
  state: GameState
  error: SubmitError
}

export type PuzzleLike = {
  id: string
  solution: string
}

export const WORD_LENGTH = 5
export const DEFAULT_MAX_ATTEMPTS = 6

const LETTER_STATE_PRIORITY: Record<LetterState, number> = {
  absent: 1,
  present: 2,
  correct: 3,
}

export function normalizeWord(word: string): string {
  return word.trim().toUpperCase()
}

export function isValidWord(word: string, allowedWords: readonly string[]): boolean {
  const normalized = normalizeWord(word)
  return (
    /^[A-Z]{5}$/.test(normalized) &&
    allowedWords.some((allowed) => normalizeWord(allowed) === normalized)
  )
}

export function evaluateGuess(solutionInput: string, guessInput: string): EvaluatedLetter[] {
  const solution = normalizeWord(solutionInput)
  const guess = normalizeWord(guessInput)

  if (!/^[A-Z]{5}$/.test(solution) || !/^[A-Z]{5}$/.test(guess)) {
    throw new Error('Solution and guess must both be five alphabetical letters.')
  }

  const result: Array<EvaluatedLetter | undefined> = Array(WORD_LENGTH).fill(undefined)
  const remainingCounts = new Map<string, number>()

  for (let index = 0; index < WORD_LENGTH; index += 1) {
    const letter = guess[index]
    const solutionLetter = solution[index]

    if (letter === solutionLetter) {
      result[index] = { letter, state: 'correct' }
    } else {
      remainingCounts.set(
        solutionLetter,
        (remainingCounts.get(solutionLetter) ?? 0) + 1,
      )
    }
  }

  for (let index = 0; index < WORD_LENGTH; index += 1) {
    if (result[index]) continue

    const letter = guess[index]
    const remaining = remainingCounts.get(letter) ?? 0
    const state: LetterState = remaining > 0 ? 'present' : 'absent'

    result[index] = { letter, state }
    if (remaining > 0) remainingCounts.set(letter, remaining - 1)
  }

  return result as EvaluatedLetter[]
}

function feedbackPattern(result: readonly EvaluatedLetter[]): string {
  return result.map(({ state }) => state[0]).join('')
}

export function isFeedbackEquivalent(
  candidate: string,
  guess: string,
  expectedResult: readonly EvaluatedLetter[],
): boolean {
  return feedbackPattern(evaluateGuess(candidate, guess)) === feedbackPattern(expectedResult)
}

export function getRemainingCandidates(
  candidates: readonly string[],
  guesses: readonly Guess[],
): string[] {
  return candidates
    .map(normalizeWord)
    .filter((candidate) =>
      guesses.every(({ word, result }) =>
        isFeedbackEquivalent(candidate, word, result),
      ),
    )
}

export function createInitialGameState(
  solution: string,
  puzzleId?: string,
  maxAttempts = DEFAULT_MAX_ATTEMPTS,
): GameState {
  const normalizedSolution = normalizeWord(solution)
  if (!/^[A-Z]{5}$/.test(normalizedSolution)) {
    throw new Error('A game solution must be exactly five alphabetical letters.')
  }

  return {
    solution: normalizedSolution,
    guesses: [],
    currentGuess: '',
    status: 'playing',
    maxAttempts,
    candidateHistory: [],
    puzzleId,
  }
}

export function addLetter(state: GameState, letterInput: string): GameState {
  const letter = normalizeWord(letterInput)
  if (
    state.status !== 'playing' ||
    state.currentGuess.length >= WORD_LENGTH ||
    !/^[A-Z]$/.test(letter)
  ) {
    return state
  }

  return { ...state, currentGuess: `${state.currentGuess}${letter}` }
}

export function removeLetter(state: GameState): GameState {
  if (state.status !== 'playing' || state.currentGuess.length === 0) return state
  return { ...state, currentGuess: state.currentGuess.slice(0, -1) }
}

export function submitGuess(
  state: GameState,
  allowedWords: readonly string[],
  candidateWords: readonly string[],
): SubmitResult {
  if (state.status !== 'playing') return { state, error: null }
  if (state.currentGuess.length !== WORD_LENGTH) {
    return { state, error: 'not-enough-letters' }
  }
  if (!isValidWord(state.currentGuess, allowedWords)) {
    return { state, error: 'word-not-found' }
  }

  const word = normalizeWord(state.currentGuess)
  const guess: Guess = {
    word,
    result: evaluateGuess(state.solution, word),
  }
  const guesses = [...state.guesses, guess]
  const won = word === state.solution
  const lost = !won && guesses.length >= state.maxAttempts
  const remainingCandidates = getRemainingCandidates(candidateWords, guesses)

  return {
    state: {
      ...state,
      guesses,
      currentGuess: '',
      status: won ? 'won' : lost ? 'lost' : 'playing',
      candidateHistory: [...state.candidateHistory, remainingCandidates.length],
    },
    error: null,
  }
}

export function getKeyboardState(
  guesses: readonly Guess[],
): Partial<Record<string, LetterState>> {
  const keyboard: Partial<Record<string, LetterState>> = {}

  for (const guess of guesses) {
    for (const { letter, state } of guess.result) {
      const current = keyboard[letter]
      if (!current || LETTER_STATE_PRIORITY[state] > LETTER_STATE_PRIORITY[current]) {
        keyboard[letter] = state
      }
    }
  }

  return keyboard
}

export function resetGame(state: GameState): GameState {
  return createInitialGameState(state.solution, state.puzzleId, state.maxAttempts)
}

export function selectPuzzle<TPuzzle extends PuzzleLike>(
  puzzles: readonly TPuzzle[],
  id: string,
): TPuzzle | undefined {
  return puzzles.find((puzzle) => puzzle.id === id)
}

export function selectDailyPuzzle<TPuzzle extends PuzzleLike>(
  puzzles: readonly TPuzzle[],
  date = new Date(),
): TPuzzle {
  if (puzzles.length === 0) throw new Error('At least one puzzle is required.')

  const localDay = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000,
  )
  return puzzles[((localDay % puzzles.length) + puzzles.length) % puzzles.length]
}
