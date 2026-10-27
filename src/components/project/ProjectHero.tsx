import type { Project } from '../../data/projects'
import { Link } from '../../routing'
import { Chip } from '../Chip'
import { ProjectMedia } from './ProjectMedia'

export function ProjectHero({ project }: { project: Project }) {
  const links = [
    project.liveUrl ? { label: 'View live', url: project.liveUrl } : null,
    project.githubUrl ? { label: 'GitHub', url: project.githubUrl } : null,
    ...(project.externalLinks ?? []),
  ].filter((link): link is { label: string; url: string } => Boolean(link))

  return (
    <header className="project-hero page-frame">
      <div className="project-hero__topline"><span>{project.index} / Project</span><span>{project.category} · {project.year}</span></div>
      <h1 className={project.title.length > 10 ? 'project-hero__title--compact' : undefined}>{project.title}</h1>
      <div className="project-hero__introduction">
        <p>{project.summary}</p>
        {links.length ? <nav className="project-hero__actions" aria-label="Project links">{links.map((link) => link.url.startsWith('/') ? <Link className="site-button site-button--secondary" to={link.url} key={link.url}>{link.label} <span aria-hidden="true">↗</span></Link> : <a className="site-button site-button--secondary" href={link.url} target="_blank" rel="noreferrer" aria-label={`${link.label} (opens in a new tab)`} key={link.url}>{link.label} <span aria-hidden="true">↗</span></a>)}</nav> : null}
      </div>
      <dl className="project-meta">
        {project.role ? <div><dt>Role</dt><dd>{project.role}</dd></div> : null}
        <div><dt>Year</dt><dd>{project.year}</dd></div>
        <div><dt>Type</dt><dd>{project.category}</dd></div>
        {project.tags?.length ? <div className="project-meta__stack"><dt>Stack</dt><dd><span className="chip-row">{project.tags.map((tag) => <Chip variant="inset-d" key={tag}>{tag}</Chip>)}</span></dd></div> : null}
      </dl>
      {project.heroMedia ? <ProjectMedia className={`project-hero__media${project.heroMedia.kind === 'interface' ? ' project-hero__interface-media' : ''}`} media={project.heroMedia} priority /> : null}
    </header>
  )
}
