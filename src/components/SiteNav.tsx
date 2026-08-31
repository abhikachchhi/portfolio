import { useEffect, useRef, useState } from 'react'
import { Link, useRouter } from '../routing'
import { NavGlassSurface } from './NavGlassSurface'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Playground', to: '/playground' },
]

export function SiteNav() {
  const { path } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
        return
      }

      if (event.key === 'Tab') {
        const focusable = sheetRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)
  const isActive = (to: string) => path === to || (to === '/work' && path.startsWith('/work/'))

  return (
    <header className="site-header">
      <NavGlassSurface className="site-nav" contentKey={path} aria-label="Primary navigation">
        <Link className="site-nav__brand" to="/" aria-label="Abhishek Kachchhi, home">
          <span className="site-nav__monogram">AK</span><span className="site-nav__name">Abhishek Kachchhi</span>
        </Link>
        <div className="site-nav__links">
          {links.map((link) => <Link className={isActive(link.to) ? 'is-active' : ''} aria-current={isActive(link.to) ? 'page' : undefined} to={link.to} key={link.to}>{link.label}</Link>)}
        </div>
        <a className="site-nav__contact" href="mailto:hello@abhishekkachchhi.dev">Let's talk <span aria-hidden="true">↗</span></a>
        <button ref={triggerRef} className="site-nav__menu-trigger" type="button" aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={isOpen ? 'Close menu' : 'Open menu'} onClick={() => setIsOpen((open) => !open)}>
          <span aria-hidden="true">{isOpen ? '×' : '+'}</span>
        </button>
      </NavGlassSurface>
      {isOpen && (
        <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu" onMouseDown={(event) => { if (event.target === event.currentTarget) closeMenu() }}>
          <div ref={sheetRef} className="mobile-menu__sheet glass-chrome">
            <p>Navigate</p>
            <div className="mobile-menu__links">
              {links.map((link, index) => <Link ref={index === 0 ? firstLinkRef : undefined} className={isActive(link.to) ? 'is-active' : ''} aria-current={isActive(link.to) ? 'page' : undefined} to={link.to} onClick={closeMenu} key={link.to}><span>0{index + 1}</span>{link.label}</Link>)}
            </div>
            <a className="mobile-menu__contact" href="mailto:hello@abhishekkachchhi.dev">Start a conversation <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      )}
    </header>
  )
}
