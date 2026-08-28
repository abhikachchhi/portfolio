import { WorkEntry } from '../components/WorkEntry'
import { projects } from '../data/projects'

export function WorkPage() {
  return (
    <div className="inner-page page-frame">
      <header className="page-intro">
        <div className="page-intro__meta"><span>01 / Work</span><span>Selected projects · 2025—26</span></div>
        <h1>Selected<br />work.</h1>
        <p>Interactive systems, expressive interfaces, and digital objects shaped through design and code.</p>
      </header>
      <section className="work-list" aria-label="Project previews">{projects.map((project) => <WorkEntry project={project} key={project.index} />)}</section>
      <p className="page-note">Detailed case studies and project pages will arrive in a later milestone.</p>
    </div>
  )
}
