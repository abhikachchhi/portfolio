import { Link } from '../routing'

export function SiteFooter() {
  return (
    <footer className="site-footer page-frame">
      <div className="site-footer__lead">
        <div><p>Contact</p><h2>Let’s make it tangible.</h2></div>
        <a className="site-button site-button--primary" href="mailto:abhikachchhi@gmail.com">Email me <span aria-hidden="true">↗</span></a>
      </div>

      <div className="site-footer__base">
        <Link className="site-footer__brand" to="/">AK / Abhishek Kachchhi</Link>
        <nav className="site-footer__nav" aria-label="Footer navigation">
          <Link to="/work">Work</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
          <Link to="/playground">Playground</Link>
        </nav>
        <div className="site-footer__links">
          <a href="mailto:abhikachchhi@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/abhishekkachchhi" target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in a new tab)">LinkedIn</a>
          <a href="https://github.com/abhikachchhi" target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in a new tab)">GitHub</a>
        </div>
        <span>Winnipeg, MB · © {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
