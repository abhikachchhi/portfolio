import { useEffect, useState } from 'react'
import { SiteShell } from './components/SiteShell'
import { IntroExperience } from './components/intro/IntroExperience'
import { shouldPlayIntro } from './components/intro/introState'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { SystemPage } from './pages/SystemPage'
import { WorkPage } from './pages/WorkPage'
import { RouterProvider } from './routing'
import './styles/site.css'

const pageTitles: Record<string, string> = {
  '/': 'Abhishek Kachchhi — Creative Developer',
  '/work': 'Work — Abhishek Kachchhi',
  '/about': 'About — Abhishek Kachchhi',
  '/playground': 'Playground — Abhishek Kachchhi',
  '/system': 'Design System — Abhishek Kachchhi',
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [introActive, setIntroActive] = useState(shouldPlayIntro)

  useEffect(() => {
    const handlePopState = () => {
      const nextPath = window.location.pathname
      setIntroActive(false)
      setPath(nextPath)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    document.title = pageTitles[path] ?? 'Page not found — Abhishek Kachchhi'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [path])

  const finishIntro = () => {
    setIntroActive(false)
  }

  const navigate = (to: string) => {
    if (to === path) return
    setIntroActive(false)
    window.history.pushState({}, '', to)
    setPath(to)
  }

  if (path === '/system') return <SystemPage />

  let page
  if (path === '/') page = <HomePage />
  else if (path === '/work') page = <WorkPage />
  else if (path === '/about') page = <AboutPage />
  else if (path === '/playground') page = <PlaygroundPage />
  else page = <NotFoundPage />

  return (
    <RouterProvider value={{ path, navigate }}>
      <SiteShell introActive={introActive} intro={introActive ? <IntroExperience onComplete={finishIntro} /> : null}>{page}</SiteShell>
    </RouterProvider>
  )
}

export default App
