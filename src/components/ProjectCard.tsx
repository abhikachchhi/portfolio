import { Chip } from './Chip'
import { GlassPanel } from './GlassPanel'
import './components.css'

export function ProjectCard() {
  return (
    <GlassPanel variant="interactive" className="project-card">
      <div className="project-card__visual" aria-hidden="true">
        <span className="project-card__orb project-card__orb--violet" />
        <span className="project-card__orb project-card__orb--cyan" />
        <span className="project-card__index">01</span>
      </div>
      <div className="project-card__body">
        <div className="project-card__eyebrow"><span>Selected study</span><span>2026</span></div>
        <h3>Project Name</h3>
        <p>A tactile digital experience exploring motion, material, and interaction.</p>
        <div className="project-card__footer">
          <div className="chip-row" aria-label="Technologies"><Chip>React</Chip><Chip>WebGL</Chip><Chip>Interaction</Chip></div>
          <span className="project-card__arrow" aria-hidden="true">↗</span>
        </div>
      </div>
    </GlassPanel>
  )
}
