import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Event from './pages/event/event'
import AddEvent from './pages/event/addEvent'
import EditEvent from './pages/event/editEvent'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Event />} />
        <Route path='/add' element={<AddEvent />} />
        <Route path='/edit/:id' element={<EditEvent />} />
      </Routes>
    </Router>
  )
}

export default App
