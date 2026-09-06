import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const mockHistory = [
  {
    id: '1',
    home_team_name: 'Casa',
    away_team_name: 'Visitante',
    final_home_score: 82,
    final_away_score: 76,
    finished_at: new Date().toISOString(),
  },
]

export default function HistoryPage() {
  return (
    <div className="mx-auto min-h-screen max-w-2xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Histórico</h1>
        <Link to="/">
          <Button variant="secondary">Voltar</Button>
        </Link>
      </div>

      {mockHistory.length === 0 ? (
        <p className="text-foreground-muted">Nenhum jogo finalizado ainda.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {mockHistory.map((game) => (
            <div
              key={game.id}
              className="rounded-lg border border-border bg-surface p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">
                  {game.home_team_name} {game.final_home_score} x{' '}
                  {game.final_away_score} {game.away_team_name}
                </span>
                <span className="text-sm text-foreground-muted">
                  {new Date(game.finished_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
