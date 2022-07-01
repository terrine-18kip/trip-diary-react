import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserProvider } from './Context'
import Default from './Default'
import Login from './components/auth/Login'
import Entry from './components/auth/Entry'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/entry' element={<Entry />} />
        <Route path='/*' element={<Default />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
