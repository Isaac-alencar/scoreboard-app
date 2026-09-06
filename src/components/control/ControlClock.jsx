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
  const [displaySeconds, setDisplaySeconds] = useState(seconds)

  useEffect(() => {
    setDisplaySeconds(
      remainingSeconds({
        clockSeconds: seconds,
        clockRunning: running,
        clockUpdatedAt: updatedAt,
      })
    )

    if (!running) return

    const interval = setInterval(() => {
      setDisplaySeconds((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [seconds, running, updatedAt])

  const minutes = Math.floor(displaySeconds / 60)
  const secs = String(Math.floor(displaySeconds % 60)).padStart(2, '0')

  return (
    <span className="tabular-nums">
      {minutes}:{secs}
    </span>
  )
}
