import { useEffect, useRef, useState } from 'react'
import { remainingSeconds } from '../lib/clock'

const TICK_MS = 250

/**
 * Tempo restante do cronômetro, derivado de clock_seconds + clock_updated_at.
 *
 * @param {{
 *   seconds: number
 *   running: boolean
 *   updatedAt?: string
 * }} params
 * @returns {number} segundos inteiros restantes
 */
export function useGameClock({ seconds, running, updatedAt }) {
  const [now, setNow] = useState(Date.now)
  const intervalRef = useRef(null)
  const lastShownRef = useRef(null)

  useEffect(() => {
    if (!running) return

    const params = {
      clockSeconds: seconds,
      clockRunning: true,
      clockUpdatedAt: updatedAt,
    }

    function tick() {
      const current = Date.now()
      const shown = Math.ceil(remainingSeconds({ ...params, now: current }))
      if (shown !== lastShownRef.current) {
        lastShownRef.current = shown
        setNow(current)
      }
      if (shown <= 0) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    tick()
    intervalRef.current = setInterval(tick, TICK_MS)

    return () => {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      lastShownRef.current = null
    }
  }, [seconds, running, updatedAt])

  if (!running) return seconds

  return Math.ceil(
    remainingSeconds({
      clockSeconds: seconds,
      clockRunning: true,
      clockUpdatedAt: updatedAt,
      now,
    }),
  )
}
