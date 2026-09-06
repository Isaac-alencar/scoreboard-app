import { ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ClockControls from '../components/control/ClockControls'
import FinishGameModal from '../components/control/FinishGameModal'
import FoulControls from '../components/control/FoulControls'
import PeriodControls from '../components/control/PeriodControls'
import ScoreButtons from '../components/control/ScoreButtons'

const mockGame = {
  id: 'mock-id',
  status: 'live',
  home_team_name: 'Casa',
  away_team_name: 'Visitante',
  home_score: 0,
  away_score: 0,
  home_fouls: 0,
  away_fouls: 0,
  period: 1,
  is_overtime: false,
  clock_running: false,
  clock_seconds: 600,
  clock_updated_at: new Date().toISOString(),
  period_duration_seconds: 600,
  overtime_duration_seconds: 300,
  total_periods: 4,
  control_token: 'mock-token',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export default function ControlPage() {
  const [searchParams] = useSearchParams()
  const [showFinishModal, setShowFinishModal] = useState(false)
  const token = searchParams.get('token')

  const periodLabel = mockGame.is_overtime
    ? 'OT'
    : `Q${mockGame.period}`

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header resumo discreto para o operador */}
      <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
        <div className="flex items-center gap-4 text-foreground">
          <span className="font-semibold">{mockGame.home_team_name}</span>
          <span className="text-xl font-bold">
            {mockGame.home_score} x {mockGame.away_score}
          </span>
          <span className="font-semibold">{mockGame.away_team_name}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-foreground-muted">
            {periodLabel} · {Math.floor(mockGame.clock_seconds / 60)}:
            {String(mockGame.clock_seconds % 60).padStart(2, '0')}
          </div>
          <Link
            to={`/scoreboard/${mockGame.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost gap-1 text-xs"
          >
            Placar público
            <ExternalLink size={14} />
          </Link>
        </div>
      </header>

      {/* Painel de controle em landscape */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:flex-row">
        <section className="flex flex-1 flex-col gap-4 rounded-lg border border-border bg-surface p-4">
          <h2 className="text-center text-lg font-bold text-foreground">
            {mockGame.home_team_name}
          </h2>
          <ScoreButtons team="home" />
          <FoulControls team="home" />
        </section>

        <section className="flex flex-col justify-center gap-4">
          <ClockControls />
          <PeriodControls />
          <button
            onClick={() => setShowFinishModal(true)}
            className="btn-secondary text-danger border-danger hover:bg-danger/10"
          >
            Finalizar jogo
          </button>
        </section>

        <section className="flex flex-1 flex-col gap-4 rounded-lg border border-border bg-surface p-4">
          <h2 className="text-center text-lg font-bold text-foreground">
            {mockGame.away_team_name}
          </h2>
          <ScoreButtons team="away" />
          <FoulControls team="away" />
        </section>
      </main>

      <FinishGameModal
        isOpen={showFinishModal}
        onClose={() => setShowFinishModal(false)}
      />

      {!token && (
        <div className="absolute right-4 top-14 rounded bg-danger/20 px-3 py-1 text-sm text-danger">
          Modo visualização — token não encontrado
        </div>
      )}
    </div>
  )
}
