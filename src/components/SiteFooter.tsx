import { Link } from '../routing'

export function SiteFooter() {
  return (
    <footer className="site-footer page-frame">
      <div className="site-footer__lead">
        <p>Have a project or an unusual idea?</p>
        <a href="mailto:abhikachchhi@gmail.com">Let's make it tangible. <span aria-hidden="true">↗</span></a>
      </div>
      <div className="site-footer__base">
        <Link className="site-footer__brand" to="/">AK / Abhishek Kachchhi</Link>
        <div className="site-footer__links"><a href="https://github.com/abhikachchhi" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/abhishekkachchhi/" target="_blank" rel="noreferrer">LinkedIn</a></div>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
