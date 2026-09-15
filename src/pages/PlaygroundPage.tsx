import { GameShell as LoopTacGame } from '../components/loop-tac/GameShell'
import { WordShiftGame } from '../components/word-shift/WordShiftGame'
import '../components/word-shift/word-shift.css'

type PlaygroundGame = 'loop-tac' | 'word-shift'

type PlaygroundPageProps = {
  initialGame?: PlaygroundGame
  standalone?: boolean
}

export function PlaygroundPage({ initialGame = 'loop-tac', standalone = false }: PlaygroundPageProps) {
  if (standalone) return initialGame === 'word-shift' ? <WordShiftGame /> : <LoopTacGame />

  return (
    <div className="playground-hub">
      <LoopTacGame />
      <WordShiftGame embedded />
    </div>
  )
}
