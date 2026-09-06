/**
 * @param {{ period: number, isOvertime?: boolean }} props
 */
export default function PeriodIndicator({ period, isOvertime = false }) {
  const label = isOvertime ? 'OT' : `Q${period}`
  return <span className="bowlby-one">{label}</span>
}
