import { useParams } from 'react-router-dom'
import ScoreboardLayout from '../components/scoreboard/ScoreboardLayout'
import { useGame } from '../hooks/useGame'

export default function ScoreboardPage() {
  const { id } = useParams()
  const { game, loading, error } = useGame(id)

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        Carregando...
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-danger">
        Jogo não encontrado.
      </div>
    )
  }

  return (
    <div className="relative">
      {game.status === 'finished' && (
        <div className="absolute inset-0 z-10 flex items-start justify-center pt-8">
          <span className="rounded bg-background/80 px-6 py-2 text-2xl font-bold text-foreground backdrop-blur-sm">
            JOGO FINALIZADO
          </span>
        </div>
      )}
      <ScoreboardLayout game={game} />
    </div>
  )
}
