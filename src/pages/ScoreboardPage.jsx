import ScoreboardLayout from '../components/scoreboard/ScoreboardLayout'

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

export default function ScoreboardPage() {
  return <ScoreboardLayout game={mockGame} />
}
