import type { ProjectInterfaceMedia } from '../../data/projects'

type ProjectMediaVisualProps = {
  media: ProjectInterfaceMedia
}

const feedbackRows = [
  { word: 'SPEED', states: ['absent', 'present', 'correct', 'absent', 'absent'] },
  { word: 'SHEEP', states: ['correct', 'correct', 'correct', 'present', 'absent'] },
]

const keyboardRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

function FeedbackVisual({ label }: { label: string }) {
  return (
    <div className="word-shift-visual word-shift-visual--feedback" role="img" aria-label={label}>
      <header><span>Feedback logic</span><strong>02 / 05</strong></header>
      <div className="word-shift-visual__feedback-rows">
        {feedbackRows.map((row) => <div key={row.word}>{row.word.split('').map((letter, index) => <span className={`is-${row.states[index]}`} key={`${letter}-${index}`}>{letter}<i>{row.states[index] === 'correct' ? '=' : row.states[index] === 'present' ? '~' : '×'}</i></span>)}</div>)}
      </div>
      <div className="word-shift-visual__rule"><span>Exact position</span><i /><span>Remaining copies</span></div>
    </div>
  )
}

function SearchVisual({ label }: { label: string }) {
  return (
    <div className="word-shift-visual word-shift-visual--search" role="img" aria-label={label}>
      <header><span>Search space</span><strong>Signal narrowing</strong></header>
      <div className="word-shift-visual__search-layout">
        <div className="word-shift-visual__search-copy"><span>Candidates remaining</span><strong>008</strong><p>Each valid guess applies another duplicate-aware constraint.</p></div>
        <ol>
          <li><span>Start</span><i><b style={{ width: '100%' }} /></i><strong>231</strong></li>
          <li><span>01</span><i><b style={{ width: '62%' }} /></i><strong>084</strong></li>
          <li><span>02</span><i><b style={{ width: '34%' }} /></i><strong>026</strong></li>
          <li><span>03</span><i><b style={{ width: '16%' }} /></i><strong>008</strong></li>
        </ol>
      </div>
    </div>
  )
}

function InputVisual({ label }: { label: string }) {
  return (
    <div className="word-shift-visual word-shift-visual--input" role="img" aria-label={label}>
      <header><span>Input system</span><strong>Keyboard / Screen</strong></header>
      <div className="word-shift-visual__active-word">{'SHIFT'.split('').map((letter, index) => <span className={index === 2 ? 'is-active' : ''} key={letter}>{letter}</span>)}</div>
      <div className="word-shift-visual__keyboard">
        {keyboardRows.map((row) => <div key={row}>{row.split('').map((letter) => <span className={letter === 'S' || letter === 'H' ? 'is-known' : letter === 'I' ? 'is-active' : ''} key={letter}>{letter}</span>)}</div>)}
      </div>
      <footer><span>Physical keys</span><i /><span>Same game action</span><i /><span>On-screen keys</span></footer>
    </div>
  )
}

export function ProjectMediaVisual({ media }: ProjectMediaVisualProps) {
  if (media.visual === 'feedback') return <FeedbackVisual label={media.label} />
  if (media.visual === 'search') return <SearchVisual label={media.label} />
  return <InputVisual label={media.label} />
}
