import { useEffect, useState } from 'react'
import type { ProjectMedia as ProjectMediaData } from '../../data/projects'
import './project.css'

type ProjectMediaProps = {
  media: ProjectMediaData
  className?: string
  priority?: boolean
  preview?: boolean
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

function ProjectVideo({ media, preview, priority }: { media: Extract<ProjectMediaData, { kind: 'video' }>; preview: boolean; priority: boolean }) {
  const reducedMotion = useReducedMotion()
  const autoplay = Boolean(media.autoplay && !reducedMotion && !preview)

  return (
    <video
      src={media.src}
      poster={media.poster}
      aria-label={media.title}
      controls={preview ? false : (media.controls ?? !autoplay)}
      autoPlay={autoplay}
      muted={autoplay || media.muted}
      loop={media.loop}
      playsInline
      preload={priority ? 'metadata' : 'none'}
    />
  )
}

export function ProjectMedia({ media, className = '', priority = false, preview = false }: ProjectMediaProps) {
  const aspect = media.aspect ?? 'landscape'
  const classes = `project-media project-media--${aspect}${preview ? ' project-media--preview' : ''}${className ? ` ${className}` : ''}`

  let content
  if (media.kind === 'image') {
    const style = media.objectPosition ? { objectPosition: media.objectPosition } : undefined
    content = <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" style={style} />
  } else if (media.kind === 'video') {
    content = <ProjectVideo media={media} preview={preview} priority={priority} />
  } else {
    content = (
      <div className={`project-media__placeholder project-media__placeholder--${media.treatment}`} role="img" aria-label={`${media.label}; temporary project media placeholder`}>
        <span /><span /><span />
      </div>
    )
  }

  return (
    <figure className={classes}>
      <div className="project-media__frame">{content}</div>
      {media.caption && !preview ? <figcaption>{media.caption}</figcaption> : null}
    </figure>
  )
}
