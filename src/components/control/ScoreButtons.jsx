import Button from '../ui/Button'

/**
 * @param {{ team: 'home' | 'away' }} props
 */
export default function ScoreButtons({ team }) {
  const label = team === 'home' ? 'Casa' : 'Visitante'
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
      <span className="text-center text-sm text-foreground-muted">{label}</span>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((points) => (
          <Button key={points} className="text-lg">
            +{points}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((points) => (
          <Button key={points} variant="secondary" className="text-lg">
            -{points}
          </Button>
        ))}
      </div>
    </div>
  )
}
