import { ProjectPreview } from '../components/ProjectPreview'
import { getPublishedProjects } from '../data/projects'

export function ProjectsPage() {
  const projects = getPublishedProjects()

  return (
    <div className="inner-page page-frame">
      <header className="page-intro">
        <div className="page-intro__meta"><span>02 / Projects</span><span>Selected systems · 2026</span></div>
        <h1>Selected<br />projects.</h1>
        <p>Interactive systems, expressive interfaces, and digital objects shaped through design and code.</p>
      </header>
      <section className="project-showcase" aria-label="Project previews">{projects.map((project, index) => <ProjectPreview project={project} layout={index % 2 === 0 ? 'lead' : 'reverse'} headingLevel={2} key={project.slug} />)}</section>
    </div>
  )
}
