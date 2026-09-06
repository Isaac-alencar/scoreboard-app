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

  return <ScoreboardLayout game={game} />
}
