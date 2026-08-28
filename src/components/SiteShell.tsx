import type { ReactNode } from 'react'
import { SiteFooter } from './SiteFooter'
import { SiteNav } from './SiteNav'

export function SiteShell({ children, intro, introActive = false }: { children: ReactNode; intro?: ReactNode; introActive?: boolean }) {
  return (
    <div className={`site-shell${introActive ? ' site-shell--intro' : ''}`}>
      {intro}
      <div className="site-shell__content" inert={introActive} aria-hidden={introActive || undefined}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteNav />
        <main id="main-content" className="site-main">{children}</main>
        <SiteFooter />
      </div>
    </div>
  )
}
