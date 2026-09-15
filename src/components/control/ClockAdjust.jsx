import { useState } from 'react'
import { useToast } from '../../hooks/useToast'
import { updateGame } from '../../hooks/useGameActions'
import { formatClock, parseClock } from '../../lib/clock'
import Button from '../ui/Button'
import Input from '../ui/Input'

/**
 * @param {{
 *   gameId: string
 *   controlToken: string | null
 *   game: import('../../types/game').Game
 * }} props
 */
export default function ClockAdjust({ gameId, controlToken, game }) {
  const [value, setValue] = useState(() => formatClock(game.clock_seconds))
  const [busy, setBusy] = useState(false)
  const { addToast } = useToast()
  const disabled = !controlToken || busy || game.clock_running

  async function handleSubmit(event) {
    event.preventDefault()
    if (disabled) return

    const newSeconds = parseClock(value)
    if (newSeconds === null) {
      addToast('Tempo inválido. Use o formato MM:SS.')
      return
    }

    setBusy(true)
    try {
      await updateGame(gameId, controlToken, {
        clock_seconds: newSeconds,
        clock_updated_at: new Date().toISOString(),
      })
    } catch (err) {
      console.error('Erro ao ajustar cronômetro:', err)
      addToast('Erro ao ajustar cronômetro. Verifique o token de controle.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        placeholder="MM:SS"
        inputMode="numeric"
        aria-label="Ajustar tempo do cronômetro"
        className="w-24 text-center tabular-nums"
      />
      <Button type="submit" variant="secondary" disabled={disabled}>
        Definir
      </Button>
    </form>
  )
}
