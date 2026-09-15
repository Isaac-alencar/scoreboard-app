import { useGameClock } from '../../hooks/useGameClock'
import { formatClock } from '../../lib/clock'

/**
 * @param {{
 *   seconds: number
 *   running: boolean
 *   updatedAt: string
 * }} props
 */
export default function ControlClock({ seconds, running, updatedAt }) {
  const displaySeconds = useGameClock({ seconds, running, updatedAt })

  return <span className="tabular-nums">{formatClock(displaySeconds)}</span>
}
