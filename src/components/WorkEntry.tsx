import type { Project } from '../data/projects'
import { Chip } from './Chip'

export function WorkEntry({ project }: { project: Project }) {
  return (
    <article className="work-entry">
      <div className="work-entry__visual" aria-hidden="true"><span>{project.index}</span><div /></div>
      <div className="work-entry__copy">
        <div className="work-entry__meta"><span>{project.index}</span><span>{project.year}</span></div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="work-entry__footer">
          <div className="chip-row">{project.tags.map((tag, index) => <Chip variant={index === 0 && project.status === 'selected' ? 'inset-g' : index === 0 && project.status === 'signal' ? 'inset-h' : 'inset-d'} key={tag}>{tag}</Chip>)}</div>
          <span className="work-entry__arrow" aria-hidden="true">↗</span>
        </div>
      </div>
    </article>
  )
}
