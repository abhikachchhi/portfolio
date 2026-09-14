import { useEffect, useRef, useState, type PointerEvent } from 'react'
import type { Project } from '../data/projects'
import { getProjectHref, getProjectPreviewMedia } from '../data/projects'
import { Link } from '../routing'
import { Chip } from './Chip'
import { ProjectMedia } from './project/ProjectMedia'
import './ProjectPreview.css'

type ProjectPreviewProps = {
  project: Project
  layout: 'lead' | 'reverse' | 'offset'
  headingLevel?: 2 | 3
}

export function ProjectPreview({ project, layout, headingLevel = 3 }: ProjectPreviewProps) {
  const previewRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const mediaBoundsRef = useRef<DOMRect | null>(null)
  const pointerRef = useRef({ clientX: 0, clientY: 0, active: false })
  const pointerFrameRef = useRef<number | null>(null)
  const scrollFrameRef = useRef<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const Heading = headingLevel === 2 ? 'h2' : 'h3'

  useEffect(() => {
    const preview = previewRef.current
    if (!preview || !('IntersectionObserver' in window)) {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setRevealed(true)
      observer.disconnect()
    }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' })

    observer.observe(preview)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const media = mediaRef.current

    const syncLightToViewportPointer = () => {
      scrollFrameRef.current = null
      if (!pointerRef.current.active || !media) return

      const bounds = media.getBoundingClientRect()
      mediaBoundsRef.current = bounds
      const x = pointerRef.current.clientX - bounds.left
      const y = pointerRef.current.clientY - bounds.top
      const isInside = x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height

      media.style.setProperty('--project-light-x', `${x}px`)
      media.style.setProperty('--project-light-y', `${y}px`)
      media.style.setProperty('--project-light-opacity', isInside ? '1' : '0')
    }

    const requestSync = () => {
      if (!pointerRef.current.active || scrollFrameRef.current !== null) return
      scrollFrameRef.current = requestAnimationFrame(syncLightToViewportPointer)
    }

    window.addEventListener('scroll', requestSync, { passive: true })
    window.addEventListener('resize', requestSync, { passive: true })
    const resizeObserver = media && 'ResizeObserver' in window ? new ResizeObserver(requestSync) : null
    if (media) resizeObserver?.observe(media)

    return () => {
      window.removeEventListener('scroll', requestSync)
      window.removeEventListener('resize', requestSync)
      resizeObserver?.disconnect()
      if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current)
      if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current)
    }
  }, [])

  const updatePointerLight = () => {
    pointerFrameRef.current = null
    const media = mediaRef.current
    if (!media) return
    const bounds = mediaBoundsRef.current
    if (!bounds || !pointerRef.current.active) return
    const x = pointerRef.current.clientX - bounds.left
    const y = pointerRef.current.clientY - bounds.top
    const isInside = x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height
    media.style.setProperty('--project-light-x', `${x}px`)
    media.style.setProperty('--project-light-y', `${y}px`)
    media.style.setProperty('--project-light-opacity', isInside ? '1' : '0')
  }

  const onPointerEnter = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse') return
    mediaBoundsRef.current = mediaRef.current?.getBoundingClientRect() ?? null
    pointerRef.current = { clientX: event.clientX, clientY: event.clientY, active: true }
    if (pointerFrameRef.current === null) pointerFrameRef.current = requestAnimationFrame(updatePointerLight)
  }

  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse') return
    const bounds = mediaBoundsRef.current
    if (!bounds) return
    pointerRef.current = { clientX: event.clientX, clientY: event.clientY, active: true }
    if (pointerFrameRef.current === null) pointerFrameRef.current = requestAnimationFrame(updatePointerLight)
  }

  const onPointerLeave = () => {
    pointerRef.current.active = false
    mediaBoundsRef.current = null
    mediaRef.current?.style.setProperty('--project-light-opacity', '0')
  }

  return (
    <article ref={previewRef} className={`project-preview project-preview--${layout}${revealed ? ' is-revealed' : ''}`}>
      <Link className="project-preview__link" to={getProjectHref(project)} aria-label={`View ${project.title} case study`} onPointerEnter={onPointerEnter} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
        <div ref={mediaRef} className="project-preview__media">
          <ProjectMedia media={getProjectPreviewMedia(project)} preview />
          <span className="project-preview__number" aria-hidden="true">{project.index}</span>
        </div>

        <div className="project-preview__body">
          <div className="project-preview__meta"><span>{project.category}</span><span>{project.year}</span></div>
          <Heading className={`project-preview__title${project.title.length > 10 ? ' project-preview__title--compact' : ''}`}>{project.title}</Heading>
          <p>{project.summary}</p>
          <div className="project-preview__footer">
            {project.tags?.length ? <div className="chip-row" aria-label="Technologies">{project.tags.map((tag) => <Chip variant="inset-d" key={tag}>{tag}</Chip>)}</div> : <span />}
            <span className="project-preview__action">View project <span aria-hidden="true">↗</span></span>
          </div>
        </div>
      </Link>
    </article>
  )
}
