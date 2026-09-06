import { useEffect, useState } from 'react'
import { remainingSeconds } from '../../lib/clock'

/**
 * @param {{
 *   seconds: number
 *   running: boolean
 *   updatedAt: string
 * }} props
 */
export default function ControlClock({ seconds, running, updatedAt }) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(interval)
  }, [running])

  void tick

  const displaySeconds = remainingSeconds({
    clockSeconds: seconds,
    clockRunning: running,
    clockUpdatedAt: updatedAt,
  })

  const minutes = Math.floor(displaySeconds / 60)
  const secs = String(Math.floor(displaySeconds % 60)).padStart(2, '0')

  return (
    <span className="tabular-nums">
      {minutes}:{secs}
    </span>
  )
}
