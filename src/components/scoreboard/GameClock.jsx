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
    <div className="flex h-full w-full items-center justify-between bg-[#09090b] px-6 md:px-12">
      <div className="text-[clamp(2rem,5vw,4rem)] text-white">
        <PeriodIndicator period={period} isOvertime={isOvertime} />
      </div>
      <div className="text-[clamp(4rem,12vw,10rem)] leading-none text-white bowlby-one">
        {formatClock(displaySeconds)}
      </div>
    </div>
  )
}
