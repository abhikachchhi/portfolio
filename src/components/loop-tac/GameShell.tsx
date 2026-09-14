import { useState } from 'react'
import { createInitialGameState, makeMove, resetGame } from '../../game/loopTac'
import { GameBoard } from './GameBoard'
import { GameStatus } from './GameStatus'
import './loop-tac.css'

export function GameShell() {
  const [state, setState] = useState(createInitialGameState)
  const resolved = Boolean(state.winner || state.draw)

  const selectCell = (index: number) => setState((current) => makeMove(current, index))
  const restart = () => setState((current) => resetGame(current.mode))
  const toggleLoop = () => setState((current) => createInitialGameState(current.mode === 'loop' ? 'classic' : 'loop'))
  const headline = state.winner ? (state.mode === 'loop' ? `${state.winner} BREAKS THE LOOP` : `${state.winner} WINS`) : state.draw ? 'DRAW' : `${state.currentPlayer} TURN`

  return (
    <div className="loop-tac">
      <div className="loop-tac__ambient" aria-hidden="true"><span /><span /></div>
      <div className="loop-tac__frame page-frame">
        <header className="loop-tac__intro">
          <div className="loop-tac__kicker"><span>AN ENDLESS SYSTEM</span><span>PLAYGROUND / 01</span></div>
          <h1>LOOP<span>/</span>TAC</h1>
          <p>{state.mode === 'loop' ? <>Three pieces. No draws.<br />Your oldest move never lasts forever.</> : <>Classic 3×3 rules.<br />Three in a row—or a draw.</>}</p>
        </header>

        <section className="loop-tac__panel glass-panel" aria-labelledby="loop-tac-board-title">
          <header className="loop-tac__panel-head">
            <div><span className={`loop-tac__signal loop-tac__signal--${state.winner ?? state.currentPlayer}`} aria-hidden="true" /> <span>{headline}</span></div>
            <div className="loop-tac__counter"><span>{String(state.moveCount).padStart(2, '0')}</span><span>MOVES</span></div>
          </header>
          <h2 id="loop-tac-board-title" className="sr-only">LOOP/TAC board</h2>
          <div className="loop-tac__player-note"><span className={`loop-tac__player-dot loop-tac__player-dot--${state.currentPlayer}`} aria-hidden="true" />{resolved ? 'SYSTEM RESOLVED' : `PLAYER ${state.currentPlayer} / PLACE A MARK`}</div>
          <GameBoard state={state} onSelect={selectCell} />
          <GameStatus state={state} />
          <div className="loop-tac__controls">
            <button className="loop-tac__reset" type="button" onClick={restart}>{resolved ? 'Play again' : 'Reset game'} <span aria-hidden="true">↻</span></button>
            <button className="loop-tac__mode" type="button" role="switch" aria-checked={state.mode === 'loop'} aria-label="Loop mode" onClick={toggleLoop}>
              <span>Loop</span><span className="loop-tac__mode-track" aria-hidden="true"><span /></span>
            </button>
          </div>
        </section>

        <footer className="loop-tac__footer"><span>PLAYGROUND / INTERACTIVE STUDY</span><span>LOOP/TAC / A SMALL SYSTEM BY ABHISHEK KACHCHHI</span></footer>
      </div>
    </div>
  )
}
