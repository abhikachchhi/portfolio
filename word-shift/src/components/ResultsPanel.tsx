import type { GameState } from '../game/wordShift'

type ResultsPanelProps = {
  game: GameState
  primaryLabel: 'PLAY AGAIN' | 'NEXT PUZZLE'
  onPrimaryAction: () => void
  onOpenArchive: () => void
}

export function ResultsPanel({ game, primaryLabel, onPrimaryAction, onOpenArchive }: ResultsPanelProps) {
  return (
    <section className="results" aria-labelledby="results-title">
      <p className="eyebrow">RESULT / {game.status === 'won' ? 'FOUND' : 'CLOSED'}</p>
      <div className="results__summary">
        <div>
          <h2 id="results-title">{game.status === 'won' ? 'Signal found.' : 'Search ended.'}</h2>
          <p>The word was <strong>{game.solution}</strong>. {game.guesses.length} valid {game.guesses.length === 1 ? 'attempt' : 'attempts'} recorded.</p>
        </div>
        <div className="results__grid" aria-label="Compact result grid">
          {game.guesses.flatMap((guess, rowIndex) =>
            guess.result.map((letter, columnIndex) => (
              <span
                className={`results__cell results__cell--${letter.state}`}
                aria-label={`Guess ${rowIndex + 1}, ${letter.letter}, ${letter.state}`}
                key={`${rowIndex}-${columnIndex}`}
              />
            )),
          )}
        </div>
      </div>
      <div className="results__actions">
        <button className="button button--primary" type="button" onClick={onPrimaryAction}>{primaryLabel}</button>
        <button className="button" type="button" onClick={onOpenArchive}>ARCHIVE</button>
      </div>
    </section>
  )
}
