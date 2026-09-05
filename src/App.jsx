import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './index.css'
import ControlPage from './pages/ControlPage'
import CreateGamePage from './pages/CreateGamePage'
import HistoryPage from './pages/HistoryPage'
import HomePage from './pages/HomePage'
import ScoreboardPage from './pages/ScoreboardPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scoreboard/new" element={<CreateGamePage />} />
        <Route path="/scoreboard/:id" element={<ScoreboardPage />} />
        <Route path="/scoreboard/:id/control" element={<ControlPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  )
}

export default App
