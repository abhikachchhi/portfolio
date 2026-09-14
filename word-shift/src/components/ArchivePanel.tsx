import type { Puzzle } from '../data/puzzles'

type ArchivePanelProps = {
  puzzles: Puzzle[]
  activePuzzleId?: string
  solvedPuzzleIds: Set<string>
  onSelect: (puzzle: Puzzle) => void
  onClose: () => void
}

export function ArchivePanel({
  puzzles,
  activePuzzleId,
  solvedPuzzleIds,
  onSelect,
  onClose,
}: ArchivePanelProps) {
  return (
    <section className="archive" aria-labelledby="archive-title">
      <div className="archive__heading">
        <div>
          <p className="eyebrow">ARCHIVE / {String(puzzles.length).padStart(3, '0')}</p>
          <h2 id="archive-title">Previous systems.</h2>
          <p>Every puzzle remains open. Choose any word system and begin immediately.</p>
        </div>
        <button className="button" type="button" onClick={onClose}>RETURN TO GAME</button>
      </div>
      <div className="archive__grid">
        {puzzles.map((puzzle) => {
          const isActive = puzzle.id === activePuzzleId
          const isSolved = solvedPuzzleIds.has(puzzle.id)
          return (
            <button
              className={`archive-card${isActive ? ' archive-card--active' : ''}`}
              type="button"
              onClick={() => onSelect(puzzle)}
              aria-current={isActive ? 'true' : undefined}
              key={puzzle.id}
            >
              <span>{puzzle.label}</span>
              <strong>{isSolved ? 'SOLVED' : isActive ? 'ACTIVE' : 'OPEN'}</strong>
            </button>
          )
        })}
      </div>
    </section>
  )
}
