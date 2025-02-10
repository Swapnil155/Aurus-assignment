import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Event from './pages/event/event'
import AddEvent from './pages/event/addEvent'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Event />} />
        <Route path='/add' element={<AddEvent />} />
      </Routes>
    </Router>
  )
}

export default App
