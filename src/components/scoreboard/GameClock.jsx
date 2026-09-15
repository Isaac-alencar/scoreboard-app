import { useEffect, useState } from 'react'
import { remainingSeconds } from '../../lib/clock'
import PeriodIndicator from './PeriodIndicator'

function formatClock(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.floor(totalSeconds % 60)
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')
  return `${mm}:${ss}`
}

/**
 * @param {{
 *   seconds: number
 *   running?: boolean
 *   updatedAt?: string
 *   period: number
 *   isOvertime?: boolean
 * }} props
 */
export default function GameClock({
  seconds,
  running = false,
  updatedAt,
  period,
  isOvertime = false,
}) {
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

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#09090b] px-6 md:px-12">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[clamp(2rem,5vw,4rem)] text-white md:left-12">
        <PeriodIndicator period={period} isOvertime={isOvertime} />
      </div>
      <div className="text-[clamp(6rem,18vw,15rem)] leading-none text-white bowlby-one">
        {formatClock(displaySeconds)}
      </div>
    </div>
  )
}
