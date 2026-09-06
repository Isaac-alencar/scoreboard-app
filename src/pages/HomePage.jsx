import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-center text-4xl font-bold text-foreground md:text-5xl">
        Scoreboard
      </h1>
      <p className="max-w-md text-center text-foreground-muted">
        Crie um jogo, controle o placar em tempo real e transmita para o público.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link to="/scoreboard/new">
          <Button>Novo jogo</Button>
        </Link>
        <Link to="/history">
          <Button variant="secondary">Histórico</Button>
        </Link>
      </div>
    </div>
  )
}
