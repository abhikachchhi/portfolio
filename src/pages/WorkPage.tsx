export function WorkPage() {
  return (
    <div className="inner-page page-frame">
      <header className="page-intro">
        <div className="page-intro__meta"><span>01 / Work</span><span>University of Winnipeg · Current</span></div>
        <h1>Technical<br />leadership.</h1>
        <p>I currently serve as Technical Lead on a University of Winnipeg project building a web-based research ethics application and review platform.</p>
      </header>
      <section className="experience-list" aria-label="Experience">
        <article className="experience-entry">
          <div className="experience-entry__meta"><span>Current role</span><span>University of Winnipeg</span></div>
          <div className="experience-entry__body">
            <h2>Technical Lead — Research Ethics Platform</h2>
            <p>Leading the technical work on a platform that allows researchers to submit, track, and manage research ethics applications, including new submissions, amendments, and renewals.</p>
            <p>Research office staff and Research Ethics Board reviewers use the same system to assign, review, and adjudicate submissions through a clear, accountable workflow.</p>

            <dl className="experience-scope">
              <div>
                <dt>Researchers</dt>
                <dd>Submit and manage new applications, amendments, and renewals.</dd>
              </div>
              <div>
                <dt>Research office</dt>
                <dd>Coordinate intake, assignment, status, and review workflows.</dd>
              </div>
              <div>
                <dt>REB reviewers</dt>
                <dd>Review and adjudicate submissions within the shared platform.</dd>
              </div>
              <div>
                <dt>Compliance context</dt>
                <dd>Designed around Canada’s TCPS 2 (2022) and PIPEDA requirements.</dd>
              </div>
            </dl>
          </div>
        </article>
      </section>
    </div>
  )
}
