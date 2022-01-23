import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Top from './components/Top'
import './App.css'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
