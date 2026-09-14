import { GameShell as LoopTacGame } from '../components/loop-tac/GameShell'
import { WordShiftGame } from '../components/word-shift/WordShiftGame'
import '../components/word-shift/word-shift.css'

type PlaygroundGame = 'loop-tac' | 'word-shift'

export function PlaygroundPage({ initialGame = 'loop-tac' }: { initialGame?: PlaygroundGame }) {
  if (initialGame === 'word-shift') return <WordShiftGame />

  return (
    <div className="playground-hub">
      <LoopTacGame />
      <WordShiftGame embedded />
    </div>
  )
}
