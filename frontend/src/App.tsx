import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserProvider } from './Context'
import Top from './components/Top'
import Login from './components/Login'
import Entry from './components/Entry'
import TripCreate from './components/TripCreate'
import TripDetail from './components/TripDetail'
import TripEdit from './components/TripEdit'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Top />} />
          <Route path='/login' element={<Login />} />
          <Route path='/entry' element={<Entry />} />
          <Route path='/new' element={<TripCreate />} />
          <Route path='/:id' element={<TripDetail />} />
          <Route path='/:id/edit' element={<TripEdit />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
