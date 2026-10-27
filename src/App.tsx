import { useEffect, useState } from 'react'
import { SiteShell } from './components/SiteShell'
import { IntroExperience } from './components/intro/IntroExperience'
import { shouldPlayIntro } from './components/intro/introState'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { SystemPage } from './pages/SystemPage'
import { WorkPage } from './pages/WorkPage'
import { getProjectBySlug } from './data/projects'
import { normalizePath } from './pathUtils'
import { RouterProvider } from './routing'
import './styles/site.css'

const pageTitles: Record<string, string> = {
  '/': 'Abhishek Kachchhi — Technical Lead & Developer',
  '/work': 'Experience — Abhishek Kachchhi',
  '/projects': 'Projects — Abhishek Kachchhi',
  '/about': 'About — Abhishek Kachchhi',
  '/playground': 'Playground — Abhishek Kachchhi',
  '/playground/loop-tac': 'LOOP/TAC — Playground — Abhishek Kachchhi',
  '/playground/word-shift': 'WORD//SHIFT — Playground — Abhishek Kachchhi',
  '/system': 'Design System — Abhishek Kachchhi',
}

const pageDescriptions: Record<string, string> = {
  '/': 'Technical leadership, dependable web systems, and interactive projects by Abhishek Kachchhi.',
  '/work': 'Abhishek Kachchhi’s current Technical Lead work on a research ethics application and review platform at the University of Winnipeg.',
  '/projects': 'Selected interactive projects by Abhishek Kachchhi, including LOOP/TAC and WORD//SHIFT.',
  '/about': 'About Abhishek Kachchhi, a Technical Lead and developer focused on clear architecture, dependable web systems, and thoughtful interfaces.',
  '/playground': 'Playable interface and game experiments by Abhishek Kachchhi.',
  '/playground/loop-tac': 'Play LOOP/TAC, a compact strategy game where move order continuously reshapes the board.',
  '/playground/word-shift': 'Play WORD//SHIFT, a five-letter deduction game with a visible remaining search space.',
  '/system': 'The typography, color, component, and glass-material foundation for Abhishek Kachchhi’s portfolio.',
}

function getProjectSlug(path: string) {
  const match = path.match(/^\/(?:projects|work)\/([^/]+)\/?$/)
  if (!match) return undefined
  try { return decodeURIComponent(match[1]) } catch { return undefined }
}

function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))
  const [introActive, setIntroActive] = useState(() => window.location.pathname === '/' && shouldPlayIntro())
  const projectSlug = getProjectSlug(path)
  const currentProject = projectSlug ? getProjectBySlug(projectSlug) : undefined

  useEffect(() => {
    const handlePopState = () => {
      const nextPath = normalizePath(window.location.pathname)
      setIntroActive(false)
      setPath(nextPath)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const title = currentProject?.seo?.title ?? (currentProject ? `${currentProject.title} — Abhishek Kachchhi` : pageTitles[path] ?? 'Page not found — Abhishek Kachchhi')
    const description = currentProject?.seo?.description ?? currentProject?.summary ?? pageDescriptions[path] ?? 'The requested page could not be found on Abhishek Kachchhi’s portfolio.'
    const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.appendChild(element)
      }
      element.content = content
    }

    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:image', new URL(currentProject?.seo?.image ?? '/images/abhishek-kachchhi.png', window.location.origin).href)
    setMeta('property', 'og:image:alt', currentProject ? `${currentProject.title} by Abhishek Kachchhi` : 'Abhishek Kachchhi')
    setMeta('name', 'twitter:card', 'summary')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', new URL(currentProject?.seo?.image ?? '/images/abhishek-kachchhi.png', window.location.origin).href)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [currentProject, path])

  const finishIntro = () => {
    setIntroActive(false)
  }

  const navigate = (to: string) => {
    const nextPath = normalizePath(to)
    if (nextPath === path) {
      if (nextPath === '/') {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
      }
      return
    }
    setIntroActive(false)
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
  }

  if (path === '/system') return <SystemPage />

  let page
  if (path === '/') page = <HomePage />
  else if (path === '/work') page = <WorkPage />
  else if (path === '/projects') page = <ProjectsPage />
  else if (currentProject) page = <ProjectDetailPage project={currentProject} />
  else if (path === '/about') page = <AboutPage />
  else if (path === '/playground') page = <PlaygroundPage />
  else if (path === '/playground/loop-tac') page = <PlaygroundPage initialGame="loop-tac" standalone />
  else if (path === '/playground/word-shift') page = <PlaygroundPage initialGame="word-shift" standalone />
  else page = <NotFoundPage />

  return (
    <RouterProvider value={{ path, navigate }}>
      <SiteShell introActive={introActive} intro={introActive ? <IntroExperience onComplete={finishIntro} /> : null}>{page}</SiteShell>
    </RouterProvider>
  )
}

export default App
