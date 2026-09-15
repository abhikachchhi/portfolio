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
  published?: boolean
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
    index: '01', slug: 'loop-tac', title: 'LOOP/TAC', summary: 'A compact strategy game where each player keeps only three active marks and every fourth move reshapes the board.', year: '2026', status: 'selected', category: 'Strategy game / Interactive system', role: 'Design and development', tags: ['React', 'TypeScript', 'Game Logic', 'Accessibility'], featured: true, published: true,
    thumbnail: placeholder('aperture', 'Abstract LOOP/TAC game-board study'),
    heroMedia: placeholder('aperture', 'Abstract LOOP/TAC interface study', 'cinematic'),
    externalLinks: [{ label: 'Play LOOP/TAC', url: '/playground/loop-tac' }],
    sections: [
      { id: 'loop-tac-idea', type: 'text', eyebrow: 'The idea', heading: 'A familiar grid that refuses to stay still.', body: ['LOOP/TAC begins with the structure of tic-tac-toe, then limits each player to three active marks. Placing a fourth removes the oldest, turning a solved grid into a continuously changing system.'] },
      { id: 'loop-tac-rules', type: 'details', eyebrow: 'Rule system', heading: 'Two modes, one clear state model.', items: [{ label: 'Loop', detail: 'Enabled by default. Each player keeps three active marks and the oldest one exits when a fourth is placed.' }, { label: 'Classic', detail: 'Disables mark recycling and restores a conventional full-board draw state.' }, { label: 'Feedback', detail: 'The interface identifies the active player, resolved state, move count, and the oldest mark due to leave.' }] },
      { id: 'loop-tac-reflection', type: 'callout', eyebrow: 'Reflection', text: 'A single rule change turns a solved board into an ongoing negotiation between memory, timing, and position.' },
    ],
    seo: { title: 'LOOP/TAC — Abhishek Kachchhi', description: 'LOOP/TAC is a compact strategy game built around three active marks, move order, and an optional looping board.' },
  },
  {
    index: '02', slug: 'word-shift', title: 'WORD//SHIFT', summary: 'Five letters, six attempts, and a visible search space. Every guess reveals both letter feedback and how much uncertainty remains.', year: '2026', status: 'selected', category: 'Word game / Interactive system', role: 'Design and development', tags: ['React', 'TypeScript', 'Game Logic', 'Accessibility', 'Vitest'], featured: true, published: true,
    thumbnail: placeholder('signal', 'Abstract WORD//SHIFT interface study'),
    heroMedia: placeholder('signal', 'Abstract WORD//SHIFT signal study', 'cinematic'),
    externalLinks: [{ label: 'Play WORD//SHIFT', url: '/playground/word-shift' }],
    sections: [
      { id: 'word-shift-idea', type: 'text', eyebrow: 'The idea', heading: 'Every guess narrows the field.', body: ['WORD//SHIFT extends a familiar five-letter deduction format with one additional layer: after every valid guess, the interface calculates how many candidate words remain consistent with everything learned so far.', 'The player sees both what the guess revealed and how much uncertainty it removed.'] },
      { id: 'word-shift-feedback', type: 'split', eyebrow: 'Feedback logic', heading: 'Repeated letters need precise accounting.', body: ['Guess evaluation runs in two passes. Exact-position matches are resolved first and consumed from the remaining solution counts. The second pass marks an unmatched letter as present only when an unused copy remains.', 'That prevents repeated letters from receiving more positive feedback than the solution can support.'], media: { ...placeholder('frame', 'Duplicate-letter feedback diagram', 'portrait'), caption: 'Duplicate-aware feedback states.' } },
      { id: 'word-shift-search-space', type: 'media', eyebrow: 'The search space', heading: 'Make uncertainty visible.', intro: 'After each guess, every possible solution is evaluated against the same input. A candidate survives only when it reproduces the exact feedback pattern for every submitted guess—a duplicate-aware constraint expressed as information design.', media: { ...placeholder('signal', 'Search-space reduction study', 'cinematic'), caption: 'Candidate space narrows after each valid guess.' }, width: 'wide' },
      { id: 'word-shift-state', type: 'details', eyebrow: 'Game state', heading: 'Pure decisions beneath the interface.', intro: 'The rules are kept separate from React so each transition remains deterministic and testable.', items: [{ label: 'State', detail: 'Solution, submitted guesses, current input, status, attempt limit, puzzle identity, and candidate-reduction history.' }, { label: 'Validation', detail: 'Incomplete and unknown words are rejected without consuming an attempt or mutating the current state.' }, { label: 'Transitions', detail: 'Typing, deletion, submission, win, loss, replay, and puzzle selection return explicit state changes.' }] },
      { id: 'word-shift-input', type: 'split', eyebrow: 'Input and keyboard', heading: 'One interaction model, two ways to play.', body: ['Physical keyboard input and a semantic on-screen QWERTY keyboard share the same game actions. Letter knowledge is merged using a strict priority: correct, then present, then absent, then unused.', 'Once a key reaches a stronger known state it never downgrades.'], media: { ...placeholder('aperture', 'WORD//SHIFT keyboard interaction study', 'landscape'), caption: 'Physical and on-screen input share one action model.' }, mediaPosition: 'left' },
      { id: 'word-shift-archive', type: 'text', eyebrow: 'Archive', heading: 'Replay without a daily lockout.', body: ['Twelve deterministic puzzles live in local data and remain immediately available through the archive. Solved status lasts only for the current session, keeping the feature lightweight while letting portfolio visitors play without waiting for another day.'] },
      { id: 'word-shift-accessibility', type: 'details', eyebrow: 'Accessibility', heading: 'Feedback that works beyond color.', items: [{ label: 'Controls', detail: 'Semantic buttons, complete physical-keyboard gameplay, logical focus behavior, and visible focus states.' }, { label: 'Status', detail: 'An aria-live region announces validation, remaining attempts, wins, and losses.' }, { label: 'Cells and keys', detail: 'Submitted tiles and keyboard controls expose descriptive state labels, while visible symbols reinforce correctness without relying on color alone.' }, { label: 'Motion and width', detail: 'Reduced-motion rules remove stagger, flip, and shake effects; the board and keyboard contract without horizontal page overflow.' }] },
      { id: 'word-shift-testing', type: 'text', eyebrow: 'Testing', heading: 'The edge cases are part of the product.', body: ['Twenty-nine passing Vitest tests cover evaluation states, duplicate letters, dictionary validation, attempt consumption, win and loss locks, keyboard-state upgrades, exact-feedback candidate filtering, archive selection, reset behavior, and immutable transitions.', 'The standalone application also passes lint and production build checks with no reported dependency vulnerabilities.'] },
      { id: 'word-shift-result', type: 'callout', eyebrow: 'Result', text: 'The final system keeps the immediacy of a familiar word game while making uncertainty visible—an exercise in precise feedback, deterministic state, and readable search-space reduction.' },
    ],
    seo: { title: 'WORD//SHIFT — Abhishek Kachchhi', description: 'WORD//SHIFT is a five-letter deduction system that turns every guess into feedback and a visible measure of the remaining search space.' },
  },
  {
    index: '03', slug: 'material-language', title: 'Material Language', summary: 'An interface study in light, depth, and restrained motion.', year: '2026', status: 'selected', category: 'Interface system', role: 'Design and development', tags: ['React', 'TypeScript', 'Interaction'],
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
    index: '04', slug: 'signal-noise', title: 'Signal / Noise', summary: 'A visual system that turns dense information into a calm, navigable field.', year: '2026', status: 'signal', category: 'Data experience', role: 'Interface design and prototyping', tags: ['React', 'Data', 'Motion'],
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
    index: '05', slug: 'quiet-machine', title: 'Quiet Machine', summary: 'A tactile software prototype built around focus, rhythm, and deliberate response.', year: '2025', category: 'Product prototype', role: 'Product design and development', tags: ['TypeScript', 'Prototype', 'Interface'],
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

export const getProjectHref = (project: Pick<Project, 'slug'>) => `/projects/${project.slug}`
export const getPublishedProjects = () => projects.filter((project) => project.published)
export const getProjectBySlug = (slug: string) => getPublishedProjects().find((project) => project.slug === slug)
export const getFeaturedProjects = () => getPublishedProjects().filter((project) => project.featured)
export const getProjectPreviewMedia = (project: Project) => project.thumbnail ?? project.heroMedia ?? placeholder('frame', `${project.title} media placeholder`)

export function getAdjacentProjects(project: Project) {
  const publishedProjects = getPublishedProjects()
  const index = publishedProjects.findIndex((candidate) => candidate.slug === project.slug)
  return { previous: index > 0 ? publishedProjects[index - 1] : undefined, next: index >= 0 && index < publishedProjects.length - 1 ? publishedProjects[index + 1] : undefined }
}
