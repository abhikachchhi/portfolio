import { Chip } from '../components/Chip'

const experiments = [
  { index: '01', title: 'Refraction study', type: 'Material / CSS', state: 'In progress' },
  { index: '02', title: 'Particle instrument', type: 'WebGL / Input', state: 'Queued' },
  { index: '03', title: 'One-button world', type: 'Game / Prototype', state: 'Sketch' },
]

export function PlaygroundPage() {
  return (
    <div className="inner-page page-frame">
      <header className="page-intro">
        <div className="page-intro__meta"><span>03 / Playground</span><span>Studies · sketches · small systems</span></div>
        <h1>Room to<br />experiment.</h1>
        <p>Small interactive ideas, visual tests, and strange interfaces that do not need to become products.</p>
      </header>
      <section className="experiment-list" aria-label="Upcoming experiments">
        {experiments.map((experiment) => <article className="experiment-row" key={experiment.index}><span>{experiment.index}</span><h2>{experiment.title}</h2><p>{experiment.type}</p><Chip variant={experiment.state === 'In progress' ? 'inset-h' : 'inset-d'}>{experiment.state}</Chip></article>)}
      </section>
      <p className="page-note">The playground will grow alongside the main portfolio.</p>
    </div>
  )
}
