import { useCallback, useEffect, useMemo, useState } from 'react'
import { ALLOWED_GUESSES, SOLUTION_WORDS } from '../data/words'
import { PUZZLES, type Puzzle } from '../data/puzzles'
import {
  addLetter,
  createInitialGameState,
  getKeyboardState,
  removeLetter,
  resetGame,
  selectDailyPuzzle,
  submitGuess,
} from '../game/wordShift'
import { ArchivePanel } from './ArchivePanel'
import { DeductionMap } from './DeductionMap'
import { GameBoard } from './GameBoard'
import { GameStatus } from './GameStatus'
import { Keyboard } from './Keyboard'
import { ResultsPanel } from './ResultsPanel'

const INITIAL_NOTICE = 'ENTER A FIVE-LETTER WORD'

export function GameShell() {
  const initialPuzzle = useMemo(() => selectDailyPuzzle(PUZZLES), [])
  const [puzzle, setPuzzle] = useState<Puzzle>(initialPuzzle)
  const [game, setGame] = useState(() =>
    createInitialGameState(initialPuzzle.solution, initialPuzzle.id),
  )
  const [notice, setNotice] = useState(INITIAL_NOTICE)
  const [invalidPulse, setInvalidPulse] = useState(0)
  const [archiveOpen, setArchiveOpen] = useState(false)
  const [solvedPuzzleIds, setSolvedPuzzleIds] = useState<Set<string>>(
    () => new Set(),
  )

  const keyStates = useMemo(() => getKeyboardState(game.guesses), [game.guesses])

  const choosePuzzle = useCallback((nextPuzzle: Puzzle) => {
    setPuzzle(nextPuzzle)
    setGame(createInitialGameState(nextPuzzle.solution, nextPuzzle.id))
    setNotice(INITIAL_NOTICE)
    setInvalidPulse(0)
    setArchiveOpen(false)
  }, [])

  const playNextPuzzle = useCallback(() => {
    const currentIndex = PUZZLES.findIndex(({ id }) => id === puzzle.id)
    choosePuzzle(PUZZLES[(currentIndex + 1) % PUZZLES.length])
  }, [choosePuzzle, puzzle.id])

  const handleInput = useCallback((key: string) => {
    if (archiveOpen || game.status !== 'playing') return

    if (key === 'ENTER') {
      const result = submitGuess(game, ALLOWED_GUESSES, SOLUTION_WORDS)
      if (result.error) {
        setNotice(result.error === 'not-enough-letters' ? 'NOT ENOUGH LETTERS' : 'WORD NOT FOUND')
        setInvalidPulse((pulse) => pulse + 1)
        return
      }

      setGame(result.state)
      if (result.state.status === 'won') {
        setNotice('YOU FOUND IT')
        setSolvedPuzzleIds((current) => new Set(current).add(puzzle.id))
      } else if (result.state.status === 'lost') {
        setNotice(`THE WORD WAS: ${result.state.solution}`)
      } else {
        const remaining = result.state.maxAttempts - result.state.guesses.length
        setNotice(`${remaining} ${remaining === 1 ? 'ATTEMPT' : 'ATTEMPTS'} REMAIN`)
      }
      return
    }

    if (key === 'BACKSPACE') {
      setGame((current) => removeLetter(current))
      setNotice(INITIAL_NOTICE)
      return
    }

    if (/^[A-Z]$/.test(key)) {
      setGame((current) => addLetter(current, key))
      setNotice(INITIAL_NOTICE)
    }
  }, [archiveOpen, game, puzzle.id])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target?.matches('input, textarea, select, [contenteditable="true"]')) return

      if (event.key === 'Enter') {
        event.preventDefault()
        handleInput('ENTER')
      } else if (event.key === 'Backspace') {
        event.preventDefault()
        handleInput('BACKSPACE')
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleInput(event.key.toUpperCase())
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleInput])

  const replayPuzzle = () => {
    setGame((current) => resetGame(current))
    setNotice(INITIAL_NOTICE)
    setInvalidPulse(0)
  }

  const hasStartedPuzzle = game.guesses.length > 0 || game.currentGuess.length > 0
  const railAction = game.status === 'won'
    ? { label: 'NEXT PUZZLE →', handler: playNextPuzzle }
    : game.status === 'lost'
      ? { label: 'PLAY AGAIN', handler: replayPuzzle }
      : hasStartedPuzzle
        ? { label: 'RETRY', handler: replayPuzzle }
        : { label: 'NEXT PUZZLE →', handler: playNextPuzzle }

  return (
    <section className="game-section" aria-label="WORD SHIFT game">
      <div className="game-section__rail">
        <p className="eyebrow">ACTIVE SYSTEM</p>
        <div>
          {!archiveOpen && (
            <button className="text-button" type="button" onClick={() => setArchiveOpen(true)}>
              ARCHIVE / {String(PUZZLES.length).padStart(3, '0')}
            </button>
          )}
          {!archiveOpen && (
            <button className="text-button" type="button" onClick={railAction.handler}>
              {railAction.label}
            </button>
          )}
        </div>
      </div>

      {archiveOpen ? (
        <ArchivePanel
          puzzles={PUZZLES}
          activePuzzleId={puzzle.id}
          solvedPuzzleIds={solvedPuzzleIds}
          onSelect={choosePuzzle}
          onClose={() => setArchiveOpen(false)}
        />
      ) : (
        <div className="game-frame">
          <GameStatus game={game} notice={notice} puzzleLabel={puzzle.label} />
          <div className="game-layout">
            <GameBoard game={game} invalidPulse={invalidPulse} />
            <div className="game-tools">
              <DeductionMap
                initialCount={SOLUTION_WORDS.length}
                history={game.candidateHistory}
              />
              <Keyboard
                keyStates={keyStates}
                disabled={game.status !== 'playing'}
                onInput={handleInput}
              />
            </div>
          </div>

          {game.status !== 'playing' && (
            <ResultsPanel
              game={game}
              primaryLabel={game.status === 'won' ? 'NEXT PUZZLE' : 'PLAY AGAIN'}
              onPrimaryAction={game.status === 'won' ? playNextPuzzle : replayPuzzle}
              onOpenArchive={() => setArchiveOpen(true)}
            />
          )}
        </div>
      )}
    </section>
  )
}
