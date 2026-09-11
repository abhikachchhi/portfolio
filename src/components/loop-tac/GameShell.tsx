import { useState } from 'react'
import { createInitialGameState, getExpiringCell, makeMove, resetGame } from '../../game/loopTac'
import { Link } from '../../routing'
import { GameBoard } from './GameBoard'
import { GameStatus } from './GameStatus'
import './loop-tac.css'

export function GameShell() {
  const [state, setState] = useState(createInitialGameState)
  const expiringCell = getExpiringCell(state)

  const selectCell = (index: number) => setState((current) => makeMove(current, index))
  const restart = () => setState(resetGame())

  return (
    <div className="loop-tac">
      <div className="loop-tac__ambient" aria-hidden="true"><span /><span /></div>
      <div className="loop-tac__frame page-frame">
        <header className="loop-tac__intro">
          <div className="loop-tac__kicker"><span>AN ENDLESS SYSTEM</span><span>PLAYGROUND / 02</span></div>
          <h1>LOOP<span>/</span>TAC</h1>
          <p>Three pieces. No draws.<br />Your oldest move never lasts forever.</p>
        </header>

        <section className="loop-tac__panel glass-panel" aria-labelledby="loop-tac-board-title">
          <header className="loop-tac__panel-head">
            <div><span className={`loop-tac__signal loop-tac__signal--${state.winner ?? state.currentPlayer}`} aria-hidden="true" /> <span>{state.winner ? `${state.winner} BREAKS THE LOOP` : `${state.currentPlayer} TURN`}</span></div>
            <div className="loop-tac__counter"><span>{String(state.moveCount).padStart(2, '0')}</span><span>MOVES</span></div>
          </header>
          <h2 id="loop-tac-board-title" className="sr-only">LOOP/TAC board</h2>
          <div className="loop-tac__player-note"><span className={`loop-tac__player-dot loop-tac__player-dot--${state.currentPlayer}`} aria-hidden="true" />{state.winner ? 'SYSTEM RESOLVED' : `PLAYER ${state.currentPlayer} / PLACE A MARK`}</div>
          <GameBoard state={state} onSelect={selectCell} />
          <GameStatus state={state} />
          <div className="loop-tac__controls">
            <button className="loop-tac__reset" type="button" onClick={restart}>{state.winner ? 'Play again' : 'Reset game'} <span aria-hidden="true">↻</span></button>
            {expiringCell !== null && !state.winner ? <span className="loop-tac__recycle-note">RECYCLING CELL {String(expiringCell + 1).padStart(2, '0')}</span> : <span className="loop-tac__recycle-note">FIFO ACTIVE</span>}
          </div>
        </section>

        <footer className="loop-tac__footer"><Link to="/playground">← Back to playground</Link><span>LOOP/TAC / A SMALL SYSTEM BY ABHISHEK KACHCHHI</span></footer>
      </div>
    </div>
  )
}
