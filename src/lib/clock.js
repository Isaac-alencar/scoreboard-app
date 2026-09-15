/**
 * @param {{
 *   clockSeconds: number
 *   clockRunning: boolean
 *   clockUpdatedAt: string
 *   now?: number
 * }} params
 * @returns {number}
 */
export function remainingSeconds({
  clockSeconds,
  clockRunning,
  clockUpdatedAt,
  now = Date.now(),
}) {
  if (!clockRunning) return clockSeconds
  const elapsed = (now - new Date(clockUpdatedAt).getTime()) / 1000
  return Math.min(clockSeconds, Math.max(0, clockSeconds - elapsed))
}

/**
 * @param {number} totalSeconds
 * @returns {string} MM:SS
 */
export function formatClock(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.floor(totalSeconds % 60)
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')
  return `${mm}:${ss}`
}

/**
 * @param {string} text M:SS ou MM:SS
 * @returns {number | null} total de segundos, ou null se inválido
 */
export function parseClock(text) {
  const match = /^(\d{1,3}):([0-5]\d)$/.exec(text.trim())
  if (!match) return null
  return Number(match[1]) * 60 + Number(match[2])
}
