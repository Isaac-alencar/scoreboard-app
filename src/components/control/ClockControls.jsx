import { Pause, Play, RotateCcw } from 'lucide-react'
import Button from '../ui/Button'

export default function ClockControls() {
  return (
    <div className="flex items-center gap-2">
      <Button className="gap-2">
        <Play size={18} />
        Iniciar
      </Button>
      <Button variant="secondary" className="gap-2">
        <Pause size={18} />
        Pausar
      </Button>
      <Button variant="ghost" aria-label="Zerar cronômetro">
        <RotateCcw size={18} />
      </Button>
    </div>
  )
}
