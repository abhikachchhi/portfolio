import { Chip } from '../components/Chip'

const skills = ['React', 'TypeScript', 'Interaction', 'Creative coding', 'UI engineering', 'Prototyping']

export function AboutPage() {
  return (
    <div className="inner-page page-frame">
      <header className="page-intro page-intro--about">
        <div className="page-intro__meta"><span>03 / About</span><span>Developer · Designer-minded</span></div>
        <h1>Code with<br />a point of view.</h1>
        <p>I’m Abhishek, a developer interested in interfaces that are useful first—and memorable because every detail earns its place.</p>
      </header>
      <section className="about-columns" aria-label="About Abhishek">
        <div className="about-columns__aside"><span>Approach</span><p>Calm systems.<br />Tactile responses.<br />Clear intent.</p></div>
        <div className="about-columns__body">
          <div className="about-block"><span>Background</span><p>I build front-end experiences with an eye for typography, motion, and how an interface feels in the hand. My work moves between product thinking and visual experimentation.</p></div>
          <div className="about-block"><span>Experience snapshot</span><ul><li><span>Current</span><strong>Independent development and interactive studies</strong></li><li><span>Focus</span><strong>Modern web interfaces and creative technology</strong></li><li><span>Based</span><strong>Winnipeg, MB, Canada</strong></li></ul></div>
          <div className="about-block"><span>Working set</span><div className="chip-row">{skills.map((skill) => <Chip key={skill}>{skill}</Chip>)}</div></div>
        </div>
      </section>
    </div>
  )
}
