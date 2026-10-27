import { Chip } from '../components/Chip'
import { Link } from '../routing'

const focusAreas = [
  'Technical leadership',
  'Workflow architecture',
  'Data and state design',
  'Frontend systems',
  'Accessibility',
  'Responsive design',
  'Testing',
  'Interaction design',
]

const technologies = ['React', 'TypeScript', 'Vite', 'CSS', 'Vitest', 'Git']

export function AboutPage() {
  return (
    <div className="inner-page about-page page-frame">
      <header className="page-intro page-intro--about">
        <div className="page-intro__meta"><span>03 / About</span><span>Winnipeg · Technical Lead</span></div>
        <h1>About me.</h1>
        <p>I’m a Technical Lead and developer building dependable web systems with clear architecture, thoughtful interfaces, and maintainable foundations.</p>
      </header>

      <section className="about-columns" aria-label="About me">
        <aside className="about-columns__aside">
          <span>Position</span>
          <p>Technical Lead.<br />Systems thinker.<br />Design-sensitive engineer.</p>
        </aside>

        <div className="about-columns__body">
          <section className="about-block" aria-labelledby="about-role-title">
            <h2 id="about-role-title">Current role</h2>
            <div className="about-block__content">
              <p>I currently lead the technical work on a University of Winnipeg project building a web-based research ethics application and review platform.</p>
              <p>The system supports new submissions, amendments, and renewals for researchers, alongside assignment, review, and adjudication workflows for research office staff and Research Ethics Board reviewers. Its compliance context includes Canada’s TCPS 2 (2022) and PIPEDA requirements.</p>
              <Link className="about-block__link" to="/work">View my current work <span aria-hidden="true">→</span></Link>
            </div>
          </section>

          <section className="about-block" aria-labelledby="about-approach-title">
            <h2 id="about-approach-title">Approach</h2>
            <div className="about-block__content">
              <p>I turn complex requirements and multi-role workflows into clear, understandable systems. Logic stays separate from presentation, responsibilities remain explicit, and responsive and accessible behavior are considered from the start.</p>
              <p>I prefer intentional dependencies, clean data structures, and reusable foundations over one-off fixes—without letting architecture get in the way of a practical result.</p>
            </div>
          </section>

          <section className="about-block" aria-labelledby="about-focus-title">
            <h2 id="about-focus-title">Current focus</h2>
            <div className="about-block__content">
              <p>My current work sits between technical leadership, workflow architecture, frontend engineering, and the interaction details that make complex software easier to use.</p>
              <div className="chip-row" aria-label="Current areas of focus">{focusAreas.map((area) => <Chip variant="inset-d" key={area}>{area}</Chip>)}</div>
            </div>
          </section>

          <section className="about-block" aria-labelledby="about-technologies-title">
            <h2 id="about-technologies-title">Selected technologies</h2>
            <div className="about-block__content">
              <p>A compact working set chosen for maintainable interfaces, predictable behavior, and fast iteration.</p>
              <div className="chip-row" aria-label="Selected technologies">{technologies.map((technology) => <Chip key={technology}>{technology}</Chip>)}</div>
            </div>
          </section>

          <section className="about-block" aria-labelledby="about-building-title">
            <h2 id="about-building-title">What I’m building</h2>
            <div className="about-block__content">
              <p>Alongside the research ethics platform, I build smaller interactive systems that explore rule design, readable state, precise feedback, and practical product development.</p>
              <div className="about-project-links">
                <Link to="/projects/loop-tac"><span>01</span><strong>LOOP/TAC</strong><span>Strategy through a changing rule system</span></Link>
                <Link to="/projects/word-shift"><span>02</span><strong>WORD//SHIFT</strong><span>Word deduction with visible uncertainty</span></Link>
                <Link to="/projects/exercise-tracker"><span>03</span><strong>EXERCISE TRACKER</strong><span>Application in active development</span></Link>
              </div>
              <Link className="about-block__link" to="/projects">View selected projects <span aria-hidden="true">→</span></Link>
            </div>
          </section>
        </div>
      </section>

      <section className="about-contact" aria-labelledby="about-contact-title">
        <div className="about-contact__meta"><span>04 / Contact</span><span>Winnipeg, MB, Canada</span></div>
        <div className="about-contact__body">
          <h2 id="about-contact-title">Start with a conversation.</h2>
          <div>
            <p>Have a thoughtful interface, product, or small system in mind? Email is the best place to begin.</p>
            <div className="about-contact__actions">
              <a className="site-button site-button--primary" href="mailto:abhikachchhi@gmail.com">abhikachchhi@gmail.com <span aria-hidden="true">↗</span></a>
              <a href="https://www.linkedin.com/in/abhishekkachchhi" target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in a new tab)">LinkedIn <span aria-hidden="true">↗</span></a>
              <a href="https://github.com/abhikachchhi" target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in a new tab)">GitHub <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
