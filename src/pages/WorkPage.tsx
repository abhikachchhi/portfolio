import { ProjectPreview } from '../components/ProjectPreview'
import { projects } from '../data/projects'

export function WorkPage() {
  return (
    <div className="inner-page page-frame">
      <header className="page-intro">
        <div className="page-intro__meta"><span>01 / Work</span><span>Selected projects · 2025—26</span></div>
        <h1>Selected<br />work.</h1>
        <p>Interactive systems, expressive interfaces, and digital objects shaped through design and code.</p>
      </header>
      <section className="project-showcase work-showcase" aria-label="Project previews">{projects.map((project, index) => <ProjectPreview project={project} layout={index % 3 === 0 ? 'lead' : index % 3 === 1 ? 'reverse' : 'offset'} headingLevel={2} key={project.slug} />)}</section>
    </div>
  )
}
