import type { ProjectSection } from '../../data/projects'
import { ProjectMedia } from './ProjectMedia'

function SectionHeading({ eyebrow, heading }: { eyebrow?: string; heading?: string }) {
  if (!eyebrow && !heading) return null
  return <header className="project-section__heading">{eyebrow ? <span>{eyebrow}</span> : null}{heading ? <h2>{heading}</h2> : null}</header>
}

function ProjectSectionView({ section }: { section: ProjectSection }) {
  if (section.type === 'text') {
    return <section id={section.id} className="project-section project-section--text page-frame"><SectionHeading eyebrow={section.eyebrow} heading={section.heading} /><div className="project-prose">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
  }

  if (section.type === 'media') {
    return <section id={section.id} className={`project-section project-section--media project-section--${section.width ?? 'wide'} page-frame`}><SectionHeading eyebrow={section.eyebrow} heading={section.heading} />{section.intro ? <p className="project-section__intro">{section.intro}</p> : null}<ProjectMedia media={section.media} /></section>
  }

  if (section.type === 'split') {
    return <section id={section.id} className={`project-section project-section--split project-section--media-${section.mediaPosition ?? 'right'} page-frame`}><div className="project-section__split-copy"><SectionHeading eyebrow={section.eyebrow} heading={section.heading} /><div className="project-prose">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div><ProjectMedia media={section.media} /></section>
  }

  if (section.type === 'gallery') {
    return <section id={section.id} className="project-section project-section--gallery page-frame"><SectionHeading eyebrow={section.eyebrow} heading={section.heading} />{section.intro ? <p className="project-section__intro">{section.intro}</p> : null}<div className={`project-gallery project-gallery--${section.columns ?? 2}`}>{section.items.map((media, index) => <ProjectMedia media={media} key={`${section.id}-${index}`} />)}</div></section>
  }

  if (section.type === 'details') {
    return <section id={section.id} className="project-section project-section--details page-frame"><SectionHeading eyebrow={section.eyebrow} heading={section.heading} /><div>{section.intro ? <p className="project-section__intro">{section.intro}</p> : null}<dl className="project-details-list">{section.items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.detail}</dd></div>)}</dl></div></section>
  }

  return <aside id={section.id} className="project-section project-section--callout page-frame"><span>{section.eyebrow ?? 'Note'}</span><blockquote><p>{section.text}</p>{section.attribution ? <cite>{section.attribution}</cite> : null}</blockquote></aside>
}

export function ProjectSections({ sections }: { sections: ProjectSection[] }) {
  return <div className="project-story">{sections.map((section) => <ProjectSectionView section={section} key={section.id} />)}</div>
}
