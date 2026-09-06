import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { createGame } from '../hooks/useGameActions'

export default function CreateGamePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    homeTeamName: 'Casa',
    awayTeamName: 'Visitante',
    periodDuration: 10,
    overtimeDuration: 5,
    totalPeriods: 4,
  })

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { id, controlToken } = await createGame({
        homeTeamName: form.homeTeamName,
        awayTeamName: form.awayTeamName,
        periodDurationMinutes: Number(form.periodDuration),
        overtimeDurationMinutes: Number(form.overtimeDuration),
        totalPeriods: Number(form.totalPeriods),
      })

      navigate(`/scoreboard/${id}/control?token=${controlToken}`)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
      <h1 className="mb-8 text-3xl font-bold text-foreground">Novo jogo</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-sm text-foreground-muted">
            Time da casa
          </label>
          <Input
            value={form.homeTeamName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, homeTeamName: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-foreground-muted">
            Time visitante
          </label>
          <Input
            value={form.awayTeamName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, awayTeamName: e.target.value }))
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm text-foreground-muted">
              Duração do quarto (min)
            </label>
            <Input
              type="number"
              min={1}
              value={form.periodDuration}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  periodDuration: Number(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-foreground-muted">
              Duração do OT (min)
            </label>
            <Input
              type="number"
              min={1}
              value={form.overtimeDuration}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  overtimeDuration: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm text-foreground-muted">
            Quantidade de períodos
          </label>
          <Input
            type="number"
            min={1}
            max={4}
            value={form.totalPeriods}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                totalPeriods: Number(e.target.value),
              }))
            }
          />
        </div>

        {error && (
          <p className="text-danger text-sm">
            Erro ao criar jogo: {error.message}
          </p>
        )}

        <div className="mt-4 flex gap-3">
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? 'Criando...' : 'Criar jogo'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
