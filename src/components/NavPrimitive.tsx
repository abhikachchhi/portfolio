import { IconButton } from './IconButton'
import { NavGlassSurface } from './NavGlassSurface'
import './components.css'

const items = [
  { label: 'Type', href: '#typography' },
  { label: 'Material', href: '#material' },
  { label: 'Controls', href: '#controls' },
]

export function NavPrimitive() {
  return (
    <NavGlassSurface className="nav-primitive" aria-label="Design system sections">
      <a className="nav-primitive__identity" href="#top" aria-label="Abhishek Kachchhi design system">
        <span>AK</span><span className="nav-primitive__wordmark">Abhishek Kachchhi</span>
      </a>
      <div className="nav-primitive__links">
        {items.map((item, index) => <a className={index === 0 ? 'is-active' : ''} href={item.href} key={item.href}>{item.label}</a>)}
      </div>
      <IconButton label="Open menu">+</IconButton>
    </NavGlassSurface>
  )
}
