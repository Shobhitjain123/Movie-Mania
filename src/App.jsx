import { Routes, Route } from 'react-router-dom'
import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'
import { MovieProvider } from './context/MovieContext'

function App() {
  return (
    <MovieProvider>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </MovieProvider>
  )
}

export default App
