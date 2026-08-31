export type ProjectMediaAspect = 'auto' | 'landscape' | 'cinematic' | 'portrait' | 'square'
export type ProjectMediaWidth = 'contained' | 'wide' | 'full'
export type PlaceholderTreatment = 'aperture' | 'signal' | 'frame'

type ProjectMediaBase = { aspect?: ProjectMediaAspect; caption?: string }

export type ProjectImageMedia = ProjectMediaBase & {
  kind: 'image'
  src: string
  alt: string
  width?: number
  height?: number
  objectPosition?: string
}

export type ProjectVideoMedia = ProjectMediaBase & {
  kind: 'video'
  src: string
  title: string
  poster?: string
  controls?: boolean
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}

export type ProjectPlaceholderMedia = ProjectMediaBase & {
  kind: 'placeholder'
  treatment: PlaceholderTreatment
  label: string
}

export type ProjectMedia = ProjectImageMedia | ProjectVideoMedia | ProjectPlaceholderMedia

type ProjectSectionBase = { id: string; eyebrow?: string }

export type ProjectTextSection = ProjectSectionBase & {
  type: 'text'
  heading: string
  body: string[]
}

export type ProjectMediaSection = ProjectSectionBase & {
  type: 'media'
  heading?: string
  intro?: string
  media: ProjectMedia
  width?: ProjectMediaWidth
}

export type ProjectSplitSection = ProjectSectionBase & {
  type: 'split'
  heading: string
  body: string[]
  media: ProjectMedia
  mediaPosition?: 'left' | 'right'
}

export type ProjectGallerySection = ProjectSectionBase & {
  type: 'gallery'
  heading?: string
  intro?: string
  items: ProjectMedia[]
  columns?: 2 | 3
}

export type ProjectDetailsSection = ProjectSectionBase & {
  type: 'details'
  heading: string
  intro?: string
  items: Array<{ label: string; detail: string }>
}

export type ProjectCalloutSection = ProjectSectionBase & {
  type: 'callout'
  text: string
  attribution?: string
}

export type ProjectSection =
  | ProjectTextSection
  | ProjectMediaSection
  | ProjectSplitSection
  | ProjectGallerySection
  | ProjectDetailsSection
  | ProjectCalloutSection

export type ProjectLink = { label: string; url: string }

export type Project = {
  index: string
  slug: string
  title: string
  shortTitle?: string
  summary: string
  year: string
  status?: 'selected' | 'signal' | 'in-progress'
  category: string
  role?: string
  tags?: string[]
  featured?: boolean
  thumbnail?: ProjectMedia
  heroMedia?: ProjectMedia
  githubUrl?: string
  liveUrl?: string
  externalLinks?: ProjectLink[]
  sections?: ProjectSection[]
  seo?: { title?: string; description?: string; image?: string }
}

const placeholder = (treatment: PlaceholderTreatment, label: string, aspect: ProjectMediaAspect = 'landscape'): ProjectPlaceholderMedia => ({ kind: 'placeholder', treatment, label, aspect })

export const projects: Project[] = [
  {
    index: '01', slug: 'material-language', title: 'Material Language', summary: 'An interface study in light, depth, and restrained motion.', year: '2026', status: 'selected', category: 'Interface system', role: 'Design and development', tags: ['React', 'TypeScript', 'Interaction'], featured: true,
    thumbnail: placeholder('aperture', 'Abstract aperture study'),
    heroMedia: placeholder('aperture', 'Large abstract aperture study', 'cinematic'),
    sections: [
      { id: 'overview', type: 'text', eyebrow: 'Overview', heading: 'A study of interface material.', body: ['This placeholder case study explores how light, depth, and motion can establish a coherent interface language without overwhelming the content.', 'The final project story can replace these paragraphs while keeping the same editorial structure.'] },
      { id: 'approach', type: 'split', eyebrow: 'Approach', heading: 'Build the material from a small set of rules.', body: ['A restrained token system keeps surfaces, motion, and interaction consistent while leaving room for project-specific composition.'], media: placeholder('frame', 'Interface material frame study', 'portrait') },
      { id: 'technical-decisions', type: 'details', eyebrow: 'Technical decisions', heading: 'A lightweight implementation.', intro: 'Temporary details demonstrating how technical reasoning can be presented without becoming a dashboard.', items: [{ label: 'Structure', detail: 'Typed content rendered through reusable editorial sections.' }, { label: 'Motion', detail: 'Transform and opacity-led interaction with reduced-motion fallbacks.' }, { label: 'Material', detail: 'Shared surface tokens with targeted variants for specific interface roles.' }] },
      { id: 'result', type: 'media', eyebrow: 'Result', heading: 'One visual language across the experience.', intro: 'A wide media moment prepared for a future project screenshot or muted demonstration video.', media: { ...placeholder('signal', 'Wide result placeholder', 'cinematic'), caption: 'Placeholder media — replace with final project imagery.' }, width: 'wide' },
      { id: 'reflection', type: 'callout', eyebrow: 'Reflection', text: 'The strongest interaction is often the one that becomes clear only after it is touched.' },
    ],
    seo: { description: 'A placeholder case study for the Material Language interface study.' },
  },
  {
    index: '02', slug: 'signal-noise', title: 'Signal / Noise', summary: 'A visual system that turns dense information into a calm, navigable field.', year: '2026', status: 'signal', category: 'Data experience', role: 'Interface design and prototyping', tags: ['React', 'Data', 'Motion'], featured: true,
    thumbnail: placeholder('signal', 'Abstract signal field study'),
    heroMedia: placeholder('signal', 'Large abstract signal field study', 'cinematic'),
    sections: [
      { id: 'context', type: 'text', eyebrow: 'Context', heading: 'Give dense information room to breathe.', body: ['This neutral placeholder demonstrates a research-oriented project introduction without inventing clients, metrics, or outcomes.'] },
      { id: 'system', type: 'gallery', eyebrow: 'System', heading: 'Related views, held together by rhythm.', intro: 'Galleries can contain images, videos, or temporary visual studies and collapse to a single column on smaller screens.', columns: 2, items: [placeholder('signal', 'Signal view placeholder one', 'landscape'), placeholder('frame', 'Signal view placeholder two', 'landscape')] },
      { id: 'outcome', type: 'callout', eyebrow: 'Outcome', text: 'A calm frame can make complex material feel approachable without making it simplistic.' },
    ],
    seo: { description: 'A placeholder case study for the Signal / Noise data experience.' },
  },
  {
    index: '03', slug: 'quiet-machine', title: 'Quiet Machine', summary: 'A tactile software prototype built around focus, rhythm, and deliberate response.', year: '2025', category: 'Product prototype', role: 'Product design and development', tags: ['TypeScript', 'Prototype', 'Interface'], featured: true,
    thumbnail: placeholder('frame', 'Abstract interface frame study'),
    heroMedia: placeholder('frame', 'Large abstract interface frame study', 'cinematic'),
    sections: [
      { id: 'intent', type: 'text', eyebrow: 'Intent', heading: 'A product that responds deliberately.', body: ['This placeholder project shows that a concise case study can use fewer sections without requiring a different page implementation.'] },
      { id: 'implementation', type: 'split', eyebrow: 'Implementation', heading: 'A flexible composition, not a fixed template.', body: ['The section renderer keeps spacing and hierarchy consistent while allowing media order, section width, and content density to vary by project.'], media: placeholder('aperture', 'Quiet Machine implementation placeholder', 'square'), mediaPosition: 'left' },
      { id: 'notes', type: 'details', eyebrow: 'Build notes', heading: 'Prepared for real implementation detail.', items: [{ label: 'Interaction', detail: 'Pointer enhancements remain optional and never carry essential information.' }, { label: 'Responsive', detail: 'Editorial splits stack naturally and preserve reading order.' }] },
    ],
    seo: { description: 'A placeholder case study for the Quiet Machine product prototype.' },
  },
]

const duplicateSlugs = projects.map((project) => project.slug).filter((slug, index, slugs) => slugs.indexOf(slug) !== index)
if (duplicateSlugs.length) throw new Error(`Duplicate project slug${duplicateSlugs.length > 1 ? 's' : ''}: ${duplicateSlugs.join(', ')}`)

export const getProjectHref = (project: Pick<Project, 'slug'>) => `/work/${project.slug}`
export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug)
export const getFeaturedProjects = () => projects.filter((project) => project.featured)
export const getProjectPreviewMedia = (project: Project) => project.thumbnail ?? project.heroMedia ?? placeholder('frame', `${project.title} media placeholder`)

export function getAdjacentProjects(project: Project) {
  const index = projects.findIndex((candidate) => candidate.slug === project.slug)
  return { previous: index > 0 ? projects[index - 1] : undefined, next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined }
}
