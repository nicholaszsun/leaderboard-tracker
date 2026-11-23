import { Routes, Route } from 'react-router-dom'
import LeaderboardPage from './pages/Leaderboard'

import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/leaderboard" element={<LeaderboardPage />} />
    </Routes>
  )
}

export default App
