import { ProjectHero } from '../components/project/ProjectHero'
import { ProjectNavigation } from '../components/project/ProjectNavigation'
import { ProjectSections } from '../components/project/ProjectSections'
import type { Project } from '../data/projects'
import { getAdjacentProjects } from '../data/projects'

export function ProjectDetailPage({ project }: { project: Project }) {
  const { previous, next } = getAdjacentProjects(project)
  return (
    <article className="project-detail">
      <ProjectHero project={project} />
      {project.sections?.length ? <ProjectSections sections={project.sections} /> : null}
      <ProjectNavigation previous={previous} next={next} />
    </article>
  )
}
