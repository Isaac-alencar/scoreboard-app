import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'

export default function PeriodControls() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" aria-label="Período anterior">
        <ChevronLeft size={18} />
      </Button>
      <Button variant="secondary">OT</Button>
      <Button variant="secondary" aria-label="Próximo período">
        <ChevronRight size={18} />
      </Button>
    </div>
  )
}
