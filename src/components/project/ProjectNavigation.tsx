import type { Project } from '../../data/projects'
import { getProjectHref } from '../../data/projects'
import { Link } from '../../routing'

export function ProjectNavigation({ previous, next }: { previous?: Project; next?: Project }) {
  return (
    <nav className="project-navigation page-frame" aria-label="Project navigation">
      <Link className="project-navigation__back" to="/projects"><span aria-hidden="true">←</span> All projects</Link>
      <div className="project-navigation__projects">
        {previous ? <Link to={getProjectHref(previous)}><span>Previous project</span><strong>{previous.shortTitle ?? previous.title}</strong></Link> : <span />}
        {next ? <Link className="project-navigation__next" to={getProjectHref(next)}><span>Next project</span><strong>{next.shortTitle ?? next.title}</strong><i aria-hidden="true">→</i></Link> : <Link className="project-navigation__next" to="/projects"><span>End of selection</span><strong>All projects</strong><i aria-hidden="true">→</i></Link>}
      </div>
    </nav>
  )
}
