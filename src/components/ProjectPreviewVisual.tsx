import type { CSSProperties } from 'react'
import './ProjectPreview.css'

type ProjectPreviewVisualProps = {
  slug: string
  title: string
}

const loopTacCells = ['X', '', 'O', '', 'O', '', 'X', '', '']
const wordShiftRows = [
  ['S', 'H', 'A', 'R', 'E'],
  ['S', 'H', 'I', 'F', 'T'],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
]

function LoopTacPreview() {
  return (
    <div className="project-game-preview project-game-preview--loop" aria-hidden="true">
      <div className="project-game-preview__ambient"><span /><span /></div>
      <div className="project-game-preview__panel">
        <header className="project-game-preview__header">
          <span className="project-game-preview__state"><i /> X turn</span>
          <span className="project-game-preview__moves"><strong>04</strong> moves</span>
        </header>
        <div className="project-game-preview__loop-layout">
          <div className="project-game-preview__board-wrap">
            <span className="project-game-preview__note"><i /> Player X / place a mark</span>
            <div className="project-game-preview__loop-board">
              {loopTacCells.map((mark, index) => <span className={`project-game-preview__loop-cell${mark ? ` is-${mark.toLowerCase()}` : ''}`} key={index}>{mark ? <i /> : null}</span>)}
            </div>
          </div>
          <aside className="project-game-preview__side">
            <strong>Place three marks to enter the loop.</strong>
            <div className="project-game-preview__controls">
              <span>Reset game <i>↻</i></span>
              <span>Loop <i className="project-game-preview__toggle"><b /></i></span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function WordShiftPreview() {
  return (
    <div className="project-game-preview project-game-preview--word" aria-hidden="true">
      <div className="project-game-preview__ambient"><span /><span /></div>
      <div className="project-game-preview__panel">
        <header className="project-game-preview__header">
          <span className="project-game-preview__state project-game-preview__state--cyan"><i /> Signal active</span>
          <span className="project-game-preview__moves"><strong>02</strong> / 06</span>
        </header>
        <div className="project-game-preview__word-layout">
          <div className="project-game-preview__word-board">
            {wordShiftRows.flatMap((row, rowIndex) => row.map((letter, columnIndex) => (
              <span className={`project-game-preview__word-cell${rowIndex === 0 ? columnIndex === 0 || columnIndex === 4 ? ' is-correct' : ' is-muted' : rowIndex === 1 ? columnIndex === 2 ? ' is-correct' : columnIndex === 0 || columnIndex === 4 ? ' is-present' : ' is-muted' : ''}`} key={`${rowIndex}-${columnIndex}`}>{letter}</span>
            )))}
          </div>
          <aside className="project-game-preview__word-side">
            <span>Search space</span>
            <strong>042</strong>
            <div className="project-game-preview__signal-bars"><i /><i /><i /><i /></div>
            <p>Every guess makes the remaining possibilities visible.</p>
          </aside>
        </div>
      </div>
    </div>
  )
}

function ExerciseTrackerPreview() {
  const activityBars = [44, 70, 52, 86, 62, 76, 38]

  return (
    <div className="project-game-preview project-game-preview--tracker" aria-hidden="true">
      <div className="project-game-preview__ambient"><span /><span /></div>
      <div className="project-game-preview__panel tracker-preview">
        <header className="project-game-preview__header">
          <span className="project-game-preview__state"><i /> In development</span>
          <span className="project-game-preview__moves">Project <strong>03</strong></span>
        </header>
        <div className="tracker-preview__layout">
          <section className="tracker-preview__summary">
            <span>Weekly activity</span>
            <strong>Build in progress</strong>
            <div className="tracker-preview__chart">
              {activityBars.map((height, index) => <i style={{ '--tracker-bar': `${height}%` } as CSSProperties} key={index} />)}
            </div>
            <div className="tracker-preview__days"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
          </section>
          <aside className="tracker-preview__aside">
            <span>Current phase</span>
            <strong>Foundation</strong>
            <div className="tracker-preview__progress"><i /></div>
            <p>Stable product decisions will be documented here.</p>
          </aside>
        </div>
      </div>
    </div>
  )
}

export function ProjectPreviewVisual({ slug, title }: ProjectPreviewVisualProps) {
  if (slug === 'loop-tac') return <LoopTacPreview />
  if (slug === 'word-shift') return <WordShiftPreview />
  if (slug === 'exercise-tracker') return <ExerciseTrackerPreview />
  return <div className="project-game-preview project-game-preview--fallback" role="img" aria-label={`${title} interface preview`} />
}
