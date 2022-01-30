import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Top from './components/Top'
import TripCreate from './components/TripCreate'
import TripDetail from './components/TripDetail'
import TripEdit from './components/TripEdit'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Top />} />
        <Route path='/new' element={<TripCreate />} />
        <Route path='/:id' element={<TripDetail />} />
        <Route path='/:id/edit' element={<TripEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
