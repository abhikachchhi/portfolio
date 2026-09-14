import { GameShell } from './components/GameShell'

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="WORD SHIFT, return to top">
          WORD<span>//</span>SHIFT
        </a>
        <p>A WORD SYSTEM / 02</p>
      </header>

      <main id="top">
        <section className="intro" aria-labelledby="game-title">
          <div className="intro__index" aria-hidden="true">02 / WORD SYSTEM</div>
          <div>
            <h1 id="game-title">WORD<span>//</span>SHIFT</h1>
            <p>Six guesses. One hidden word.<br />Every move narrows the field.</p>
          </div>
          <p className="intro__note">A quiet exercise in deduction, feedback, and diminishing possibility.</p>
        </section>

        <GameShell />

        <section className="method" aria-labelledby="method-title">
          <p className="eyebrow">HOW IT WORKS / 03</p>
          <div className="method__grid">
            <h2 id="method-title">Read the signal.<br />Reduce the noise.</h2>
            <ol>
              <li><span>01</span>Enter any valid five-letter word.</li>
              <li><span>02</span>Use position and presence feedback.</li>
              <li><span>03</span>Watch the possible solution space contract.</li>
            </ol>
          </div>
        </section>
      </main>

      <footer>
        <span>WORD//SHIFT</span>
        <span>A SMALL SYSTEM BY ABHISHEK KACHCHHI</span>
      </footer>
    </div>
  )
}

export default App
