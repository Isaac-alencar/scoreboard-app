import { Minus, Plus } from 'lucide-react'
import Button from '../ui/Button'

/**
 * @param {{ team: 'home' | 'away' }} props
 */
export default function FoulControls({ team }) {
  const label = team === 'home' ? 'Faltas Casa' : 'Faltas Visitante'
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface p-4">
      <span className="text-sm text-foreground-muted">{label}</span>
      <div className="flex items-center gap-2">
        <Button variant="ghost" aria-label="Remover falta">
          <Minus size={18} />
        </Button>
        <span className="min-w-[1.5ch] text-center text-xl font-bold">0</span>
        <Button variant="ghost" aria-label="Adicionar falta">
          <Plus size={18} />
        </Button>
      </div>
    </div>
  )
}
