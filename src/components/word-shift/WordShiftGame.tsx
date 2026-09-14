import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { ALLOWED_GUESSES, SOLUTION_WORDS } from '../../../word-shift/src/data/words'
import { PUZZLES, type Puzzle } from '../../../word-shift/src/data/puzzles'
import {
  addLetter,
  createInitialGameState,
  getKeyboardState,
  removeLetter,
  resetGame,
  selectDailyPuzzle,
  submitGuess,
  type LetterState,
} from '../../../word-shift/src/game/wordShift'

const KEY_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
]

const STATE_LABEL: Record<LetterState, string> = {
  correct: 'correct position',
  present: 'present in word but wrong position',
  absent: 'not in word',
}

const INITIAL_NOTICE = 'ENTER A FIVE-LETTER WORD'

export function WordShiftGame({ embedded = false }: { embedded?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const initialPuzzle = useMemo(() => selectDailyPuzzle(PUZZLES), [])
  const [puzzle, setPuzzle] = useState<Puzzle>(initialPuzzle)
  const [game, setGame] = useState(() => createInitialGameState(initialPuzzle.solution, initialPuzzle.id))
  const [notice, setNotice] = useState(INITIAL_NOTICE)
  const [invalidPulse, setInvalidPulse] = useState(0)
  const [archiveOpen, setArchiveOpen] = useState(false)
  const [keyboardActive, setKeyboardActive] = useState(false)
  const [solvedPuzzleIds, setSolvedPuzzleIds] = useState<Set<string>>(() => new Set())
  const keyStates = useMemo(() => getKeyboardState(game.guesses), [game.guesses])

  const choosePuzzle = useCallback((nextPuzzle: Puzzle) => {
    setPuzzle(nextPuzzle)
    setGame(createInitialGameState(nextPuzzle.solution, nextPuzzle.id))
    setNotice(INITIAL_NOTICE)
    setInvalidPulse(0)
    setArchiveOpen(false)
  }, [])

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
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) {
      setKeyboardActive(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      setKeyboardActive(entry.isIntersecting && entry.intersectionRatio >= 0.2)
    }, { threshold: [0, 0.2] })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!keyboardActive) return

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
  }, [handleInput, keyboardActive])

  const replay = () => {
    setGame((current) => resetGame(current))
    setNotice(INITIAL_NOTICE)
    setInvalidPulse(0)
  }

  const nextPuzzle = () => {
    const currentIndex = PUZZLES.findIndex(({ id }) => id === puzzle.id)
    choosePuzzle(PUZZLES[(currentIndex + 1) % PUZZLES.length])
  }

  const candidateValues = [SOLUTION_WORDS.length, ...game.candidateHistory]
  const hasStartedPuzzle = game.guesses.length > 0 || game.currentGuess.length > 0
  const primaryAction = game.status === 'won'
    ? { label: 'NEXT PUZZLE', handler: nextPuzzle }
    : game.status === 'lost'
      ? { label: 'PLAY AGAIN', handler: replay }
      : hasStartedPuzzle
        ? { label: 'RETRY', handler: replay }
        : { label: 'NEXT PUZZLE', handler: nextPuzzle }

  return (
    <div ref={rootRef} className={`word-shift-game${embedded ? ' word-shift-game--embedded' : ''}`} onFocusCapture={() => setKeyboardActive(true)}>
      <div className="word-shift-game__frame page-frame">
        <header className="word-shift-game__intro">
          <div><span>A WORD SYSTEM</span><span>PLAYGROUND / 02</span></div>
          <h1>WORD<span>//</span>SHIFT</h1>
          <p>Six guesses. One hidden word.<br />Every move narrows the field.</p>
        </header>

        <section className="word-shift-game__panel glass-panel" aria-labelledby="word-shift-board-title">
          <h2 id="word-shift-board-title" className="sr-only">WORD//SHIFT game board</h2>
          <header className="word-shift-game__status">
            <div><span aria-hidden="true" />{game.status === 'playing' ? `GUESS / ${String(game.guesses.length + 1).padStart(2, '0')}` : 'SYSTEM RESOLVED'}</div>
            <div>{puzzle.label.toUpperCase()} · {game.guesses.length}/{game.maxAttempts}</div>
            <p aria-live="polite" aria-atomic="true">{notice}</p>
          </header>

          {archiveOpen ? (
            <div className="word-shift-game__archive">
              <div className="word-shift-game__archive-head"><div><span>ARCHIVE / {String(PUZZLES.length).padStart(3, '0')}</span><h2>Choose a puzzle.</h2></div><button type="button" onClick={() => setArchiveOpen(false)}>RETURN TO GAME</button></div>
              <div>{PUZZLES.map((item) => <button type="button" className={item.id === puzzle.id ? 'is-active' : ''} aria-current={item.id === puzzle.id ? 'true' : undefined} onClick={() => choosePuzzle(item)} key={item.id}><span>{item.label}</span><strong>{solvedPuzzleIds.has(item.id) ? 'SOLVED' : item.id === puzzle.id ? 'ACTIVE' : 'OPEN'}</strong></button>)}</div>
            </div>
          ) : (
            <>
              <div className="word-shift-game__layout">
                <div className={`word-shift-game__board${invalidPulse ? ' is-invalid' : ''}`} role="grid" aria-label="Six-row WORD SHIFT board" key={`${puzzle.id}-${invalidPulse}`}>
                  {Array.from({ length: game.maxAttempts }, (_, rowIndex) => {
                    const submitted = game.guesses[rowIndex]
                    const active = rowIndex === game.guesses.length && game.status === 'playing'
                    const letters = submitted?.word ?? (active ? game.currentGuess : '')
                    return <div role="row" key={rowIndex}>{Array.from({ length: 5 }, (_, columnIndex) => {
                      const evaluated = submitted?.result[columnIndex]
                      const letter = letters[columnIndex] ?? ''
                      const label = evaluated ? `Row ${rowIndex + 1}, letter ${letter}, ${STATE_LABEL[evaluated.state]}` : letter ? `Row ${rowIndex + 1}, letter ${letter}, not submitted` : `Row ${rowIndex + 1}, column ${columnIndex + 1}, empty`
                      return <div role="gridcell" aria-label={label} className={`word-shift-game__tile${letter ? ' is-filled' : ''}${evaluated ? ` is-${evaluated.state} is-evaluated` : ''}`} style={{ '--tile-index': columnIndex } as CSSProperties} key={columnIndex}><span aria-hidden="true">{letter}</span>{evaluated ? <i aria-hidden="true">{evaluated.state === 'correct' ? '=' : evaluated.state === 'present' ? '~' : '×'}</i> : null}</div>
                    })}</div>
                  })}
                </div>

                <div className="word-shift-game__tools">
                  <section className="word-shift-game__deduction" aria-labelledby="search-space-title">
                    <div><div><span id="search-space-title">SEARCH SPACE</span><p>Possible words consistent with every signal.</p></div><strong>{candidateValues.at(-1)}</strong></div>
                    <ol>{candidateValues.map((value, index) => <li key={`${index}-${value}`}><span>{index ? String(index).padStart(2, '0') : 'START'}</span><i aria-hidden="true"><b style={{ width: `${Math.max((value / SOLUTION_WORDS.length) * 100, 2)}%` }} /></i><strong>{value}</strong></li>)}</ol>
                  </section>

                  <div className="word-shift-game__keyboard" aria-label="On-screen keyboard">
                    {KEY_ROWS.map((row, rowIndex) => <div key={rowIndex}>{row.map((key) => {
                      const state = keyStates[key]
                      const label = key === 'ENTER' ? 'Submit guess' : key === 'BACKSPACE' ? 'Delete last letter' : `Letter ${key}${state ? `, ${STATE_LABEL[state]}` : ''}`
                      return <button type="button" className={`${key.length > 1 ? 'is-action' : ''}${state ? ` is-${state}` : ''}`} disabled={game.status !== 'playing'} aria-label={label} onClick={() => handleInput(key)} key={key}>{key === 'BACKSPACE' ? '⌫' : key}{state ? <i aria-hidden="true" /> : null}</button>
                    })}</div>)}
                  </div>
                </div>
              </div>

              <footer className="word-shift-game__controls">
                <div>{game.status !== 'playing' ? <><strong>{game.status === 'won' ? 'SIGNAL FOUND' : `THE WORD WAS ${game.solution}`}</strong><span>{game.guesses.length} valid {game.guesses.length === 1 ? 'attempt' : 'attempts'} recorded.</span></> : <><strong>ACTIVE PUZZLE</strong><span>Use your keyboard or the controls above.</span></>}</div>
                <div><button type="button" onClick={primaryAction.handler}>{primaryAction.label}</button><button type="button" onClick={() => setArchiveOpen(true)}>ARCHIVE</button></div>
              </footer>
            </>
          )}
        </section>

        <footer className="word-shift-game__footer"><span>PLAYGROUND / INTERACTIVE STUDY</span><span>WORD//SHIFT / A SMALL SYSTEM BY ABHISHEK KACHCHHI</span></footer>
      </div>
    </div>
  )
}
