export type Project = {
  index: string
  title: string
  summary: string
  year: string
  category: string
  tags: string[]
  href: string
  media: ProjectMedia
  status?: 'selected' | 'signal'
}

export type ProjectMedia =
  | { kind: 'placeholder'; treatment: 'aperture' | 'signal' | 'frame'; label: string }
  | { kind: 'image'; src: string; alt: string }

export const projects: Project[] = [
  { index: '01', title: 'Material Language', summary: 'An interface study in light, depth, and restrained motion.', year: '2026', category: 'Interface system', tags: ['React', 'TypeScript', 'Interaction'], href: '/work', media: { kind: 'placeholder', treatment: 'aperture', label: 'Abstract aperture study' }, status: 'selected' },
  { index: '02', title: 'Signal / Noise', summary: 'A visual system that turns dense information into a calm, navigable field.', year: '2026', category: 'Data experience', tags: ['React', 'Data', 'Motion'], href: '/work', media: { kind: 'placeholder', treatment: 'signal', label: 'Abstract signal field study' }, status: 'signal' },
  { index: '03', title: 'Quiet Machine', summary: 'A tactile software prototype built around focus, rhythm, and deliberate response.', year: '2025', category: 'Product prototype', tags: ['TypeScript', 'Prototype', 'Interface'], href: '/work', media: { kind: 'placeholder', treatment: 'frame', label: 'Abstract interface frame study' } },
]
