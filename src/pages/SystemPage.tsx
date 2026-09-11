import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { GlassPanel } from '../components/GlassPanel'
import { IconButton } from '../components/IconButton'
import { Input } from '../components/Input'
import { NavPrimitive } from '../components/NavPrimitive'
import { ProjectCard } from '../components/ProjectCard'
import './SystemPage.css'

const swatches = [
  { name: 'Background', value: '#0A0A0D', className: 'background' },
  { name: 'Surface', value: '#111317', className: 'surface' },
  { name: 'Raised', value: '#1A1D24', className: 'raised' },
  { name: 'Violet', value: '#8B7CFF', className: 'violet' },
  { name: 'Cyan', value: '#64E0FF', className: 'cyan' },
  { name: 'Text', value: '#F5F6F8', className: 'text' },
]

function SectionHeading({ number, label, title }: { number: string; label: string; title: string }) {
  return <header className="section-heading"><div className="section-heading__meta"><span>{number}</span><span>{label}</span></div><h2>{title}</h2></header>
}

export function SystemPage() {
  return (
    <div className="system-page" id="top">
      <header className="system-header"><NavPrimitive /></header>
      <main>
        <section className="system-hero" aria-labelledby="system-title">
          <div className="system-hero__meta"><span>Design system</span><span>Foundation / 01</span></div>
          <div className="system-hero__copy">
            <h1 id="system-title">Material<br />language.</h1>
            <p>A restrained visual foundation for an interactive portfolio—dark, tactile, and quietly unfamiliar.</p>
          </div>
          <div className="system-hero__status"><span className="status-dot" aria-hidden="true" /><span>System online</span></div>
        </section>

        <section className="system-section" id="typography" aria-labelledby="typography-title">
          <SectionHeading number="01" label="Identity" title="Typography" />
          <div className="type-specimen">
            <div className="type-row type-row--display"><span className="type-token">Display / Dune Rise</span><p id="typography-title">Abhishek<br />Kachchhi</p></div>
            <div className="type-row type-row--h2"><span className="type-token">Heading / 02</span><p>Interaction should feel physical.</p></div>
            <div className="type-row type-row--body"><span className="type-token">Body / Geist</span><p>Clear, quiet typography gives experimental work enough room to feel intentional. Interface copy stays neutral and legible.</p></div>
            <p className="type-note">Dune Rise loaded locally · Fontswan · SIL OFL 1.1</p>
          </div>
        </section>

        <section className="system-section" aria-labelledby="palette-title">
          <SectionHeading number="02" label="Foundation" title="Palette" />
          <div className="palette-grid" id="palette-title">
            {swatches.map((swatch) => <div className={`swatch swatch--${swatch.className}`} key={swatch.name}><span>{swatch.name}</span><code>{swatch.value}</code></div>)}
          </div>
        </section>

        <section className="system-section" id="material" aria-labelledby="material-title">
          <SectionHeading number="03" label="Material" title="Glass surfaces" />
          <div className="glass-lab" id="material-title">
            <GlassPanel className="material-sample" variant="subtle"><span className="material-sample__label">01 / Subtle</span><p>Quiet grouping for secondary information.</p></GlassPanel>
            <GlassPanel className="material-sample" variant="elevated"><span className="material-sample__label">02 / Elevated</span><p>Layered surface for menus and overlays.</p></GlassPanel>
            <GlassPanel className="material-sample" variant="interactive"><span className="material-sample__label">03 / Interactive</span><p>Tactile material for selected controls.</p></GlassPanel>
          </div>
        </section>

        <section className="system-section" id="controls" aria-labelledby="controls-title">
          <SectionHeading number="04" label="Interface" title="Controls" />
          <GlassPanel className="controls-lab" variant="elevated">
            <div className="control-group">
              <h3 id="controls-title">Buttons</h3>
              <div className="button-row">
                <Button>Explore work <span aria-hidden="true">↗</span></Button><Button variant="secondary">View details</Button><Button variant="ghost">Close</Button><Button variant="icon" aria-label="Next item"><span aria-hidden="true">→</span></Button><Button disabled>Unavailable</Button>
              </div>
            </div>
            <div className="control-grid">
              <div className="control-group"><h3>Chips</h3><div className="chip-row"><Chip>React</Chip><Chip variant="inset-g">Selected</Chip><Chip variant="inset-h">Live</Chip></div></div>
              <div className="control-group"><h3>Icon controls</h3><div className="button-row"><IconButton label="Previous item">←</IconButton><IconButton label="Next item">→</IconButton><IconButton label="Add item">+</IconButton></div></div>
              <Input label="Project search" placeholder="Type to explore…" hint="Input material test · not wired to data" />
            </div>
            <div className="chip-directions" aria-labelledby="chip-directions-title">
              <div className="chip-directions__header"><h3 id="chip-directions-title">Chip directions</h3><p>Eight material treatments. Choose by number.</p></div>
              <div className="chip-options">
                <div className="chip-option"><span>01 / Mist</span><Chip variant="mist">React</Chip></div>
                <div className="chip-option"><span>02 / Bevel</span><Chip variant="bevel">Featured</Chip></div>
                <div className="chip-option"><span>03 / Outline</span><Chip variant="outline">CSS</Chip></div>
                <div className="chip-option"><span>04 / Solid</span><Chip variant="solid">Selected</Chip></div>
                <div className="chip-option"><span>05 / Violet signal</span><Chip accent="violet" variant="indicator">Live</Chip></div>
                <div className="chip-option"><span>06 / Cyan signal</span><Chip accent="cyan" variant="indicator">Experiment</Chip></div>
                <div className="chip-option"><span>07 / Inset</span><Chip variant="inset">Archive</Chip></div>
                <div className="chip-option"><span>08 / Prism edge</span><Chip variant="prism">New study</Chip></div>
              </div>
              <div className="inset-study" aria-labelledby="inset-study-title">
                <div className="chip-directions__header"><h3 id="inset-study-title">07 / Inset variations</h3><p>Selected family · compare depth and edge treatments.</p></div>
                <div className="chip-options">
                  <div className="chip-option"><span>07A / Shallow</span><Chip variant="inset-a">Archive</Chip></div>
                  <div className="chip-option"><span>07B / Deep</span><Chip variant="inset-b">Archive</Chip></div>
                  <div className="chip-option"><span>07C / Soft edge</span><Chip variant="inset-c">Archive</Chip></div>
                  <div className="chip-option"><span>07D / Hard edge</span><Chip variant="inset-d">Archive</Chip></div>
                  <div className="chip-option"><span>07E / Tight</span><Chip variant="inset-e">Archive</Chip></div>
                  <div className="chip-option"><span>07F / Glass</span><Chip variant="inset-f">Archive</Chip></div>
                  <div className="chip-option"><span>07G / Selected</span><Chip variant="inset-g">Selected</Chip></div>
                  <div className="chip-option"><span>07H / Signal</span><Chip variant="inset-h">Live</Chip></div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </section>

        <section className="system-section" aria-labelledby="navigation-title"><SectionHeading number="05" label="Primitive" title="Navigation" /><div id="navigation-title" className="navigation-stage"><NavPrimitive /></div></section>
        <section className="system-section" aria-labelledby="project-title"><SectionHeading number="06" label="Composition" title="Project study" /><div id="project-title"><ProjectCard /></div></section>
      </main>
      <footer className="system-footer"><span>AK / System 01</span><span>320 → 1440+</span><a href="#top">Back to top ↑</a></footer>
    </div>
  )
}
