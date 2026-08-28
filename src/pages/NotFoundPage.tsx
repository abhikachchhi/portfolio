import { Link } from '../routing'

export function NotFoundPage() {
  return (
    <section className="not-found page-frame" aria-labelledby="not-found-title">
      <span>404 / Off route</span>
      <h1 id="not-found-title">Nothing<br />lives here.</h1>
      <p>The page may have moved, or it may not exist yet.</p>
      <Link className="site-button site-button--primary" to="/">Return home <span aria-hidden="true">→</span></Link>
    </section>
  )
}
