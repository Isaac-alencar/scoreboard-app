/**
 * @param {{
 *   clockSeconds: number
 *   clockRunning: boolean
 *   clockUpdatedAt: string
 * }} params
 * @returns {number}
 */
export function remainingSeconds({ clockSeconds, clockRunning, clockUpdatedAt }) {
  if (!clockRunning) return clockSeconds
  const elapsed = (Date.now() - new Date(clockUpdatedAt).getTime()) / 1000
  return Math.max(0, clockSeconds - elapsed)
}
