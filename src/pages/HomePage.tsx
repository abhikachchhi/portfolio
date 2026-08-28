import { Chip } from '../components/Chip'
import { WorkEntry } from '../components/WorkEntry'
import { projects } from '../data/projects'
import { Link } from '../routing'

export function HomePage() {
  return (
    <>
      <section className="home-hero page-frame" aria-labelledby="home-title">
        <div className="home-hero__eyebrow"><Chip variant="inset-h">Available for select work</Chip><span>Edmonton, Canada</span></div>
        <div className="home-hero__copy">
          <h1 id="home-title"><span>Abhishek</span><span>Kachchhi</span></h1>
          <div className="home-hero__intro"><p>Creative developer shaping tactile interfaces and interactive systems.</p><span>Design-led development with a focus on motion, material, and emerging web experiences.</span></div>
        </div>
        <div className="home-hero__actions"><Link className="site-button site-button--primary" to="/work">Explore work <span aria-hidden="true">↗</span></Link><Link className="site-button site-button--secondary" to="/about">About me</Link></div>
        <span className="home-hero__marker" aria-hidden="true">Scroll / 01</span>
      </section>

      <section className="site-section page-frame" aria-labelledby="selected-work-title">
        <header className="site-section__heading"><div><span>01</span><span>Selected work</span></div><h2 id="selected-work-title">A few things<br />made with intent.</h2></header>
        <div className="work-list">{projects.slice(0, 2).map((project) => <WorkEntry project={project} key={project.index} />)}</div>
        <div className="section-link"><Link to="/work">View all work <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="about-preview page-frame" aria-labelledby="about-preview-title">
        <span>02 / About</span>
        <div><h2 id="about-preview-title">Between logic<br />and atmosphere.</h2><p>I work where interface engineering meets visual experimentation—building digital experiences that feel clear, responsive, and distinctly human.</p><Link to="/about">More about my approach <span aria-hidden="true">→</span></Link></div>
      </section>
    </>
  )
}
