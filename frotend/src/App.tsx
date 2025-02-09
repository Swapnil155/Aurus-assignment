import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Event from './pages/event/event'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Event />} />
      </Routes>
    </Router>
  )
}

export default App
