export type Project = {
  index: string
  title: string
  summary: string
  year: string
  tags: string[]
  status?: 'selected' | 'signal'
}

export const projects: Project[] = [
  { index: '01', title: 'Material Language', summary: 'An interface study in light, depth, and restrained motion.', year: '2026', tags: ['React', 'Interaction'], status: 'selected' },
  { index: '02', title: 'Signal / Noise', summary: 'A real-time visual system that turns dense information into a calm field.', year: '2026', tags: ['WebGL', 'Data'], status: 'signal' },
  { index: '03', title: 'Quiet Machine', summary: 'A tactile digital object built around focus, rhythm, and deliberate response.', year: '2025', tags: ['Prototype', 'Creative code'] },
]
