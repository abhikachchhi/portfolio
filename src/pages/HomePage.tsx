import { Chip } from '../components/Chip'
import { ProjectPreview } from '../components/ProjectPreview'
import { useInteractiveHero } from '../components/useInteractiveHero'
import { getFeaturedProjects } from '../data/projects'
import { Link } from '../routing'

export function HomePage() {
  const { heroRef, pulse, clearPulse, interactionProps } = useInteractiveHero()
  const featuredProjects = getFeaturedProjects()

  return (
    <>
      <section ref={heroRef} className="home-hero page-frame" aria-labelledby="home-title" {...interactionProps}>
        <span className="home-hero__liquid-field" aria-hidden="true"><span className="home-hero__liquid-lens" />{pulse ? <span className="home-hero__pulse" style={{ left: pulse.x, top: pulse.y }} onAnimationEnd={clearPulse} /> : null}</span>
        <div className="home-hero__eyebrow"><Chip className="hero-glass-reactive" variant="inset-h" data-hero-glass>Available for select work</Chip><span>Winnipeg, MB, Canada</span></div>
        <div className="home-hero__copy">
          <div className="home-hero__title-stage"><h1 id="home-title"><span>Abhishek</span><span>Kachchhi</span></h1></div>
          <div className="home-hero__intro-stage"><div className="home-hero__intro"><p>Creative developer shaping tactile interfaces and interactive systems.</p><span>Design-led development with a focus on motion, material, and emerging web experiences.</span></div></div>
        </div>
        <div className="home-hero__actions"><Link className="site-button site-button--primary" to="/projects">Explore projects <span aria-hidden="true">↗</span></Link><Link className="site-button site-button--secondary hero-glass-reactive" data-hero-glass to="/about">About me</Link></div>
        <span className="home-hero__marker" aria-hidden="true">Scroll / 01</span>
      </section>

      <section className="site-section page-frame" aria-labelledby="selected-projects-title">
        <header className="site-section__heading"><div><span>01</span><span>Selected projects</span></div><h2 id="selected-projects-title">A few things<br />made with intent.</h2></header>
        <div className="project-showcase">{featuredProjects.slice(0, 3).map((project, index) => <ProjectPreview project={project} layout={index === 0 ? 'lead' : index === 1 ? 'reverse' : 'offset'} key={project.slug} />)}</div>
        <div className="section-link"><Link to="/projects">View all projects <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="about-preview page-frame" aria-labelledby="about-preview-title">
        <span>02 / About</span>
        <div><h2 id="about-preview-title">Between logic<br />and atmosphere.</h2><p>I work where interface engineering meets visual experimentation—building digital experiences that feel clear, responsive, and distinctly human.</p><Link to="/about">More about my approach <span aria-hidden="true">→</span></Link></div>
      </section>
    </>
  )
}
