import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserProvider } from './Context'
import Top from './components/pages/Top'
import Header from './components/Header'
import TripCreate from './components/pages/TripCreate'
import TripDetail from './components/pages/TripDetail'
import TripEdit from './components/pages/TripEdit'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const Default: React.FC = () => {
  const styles = {
    container: css`
      width: 100%;
      min-height: 100vh;
      padding: 10px 20px;
      padding-top: 45px;
      background-color: #fafafa;
      @media screen and (max-width: 768px) {
        padding: 5px 1%;
        padding-top: 45px;
      }
    `,
  }

  return (
    <UserProvider>
      <Header />
      <main css={styles.container}>
        <Routes>
          <Route path='/' element={<Top />} />
          <Route path='/new' element={<TripCreate />} />
          <Route path='/:id' element={<TripDetail />} />
          <Route path='/:id/edit' element={<TripEdit />} />
        </Routes>
      </main>
    </UserProvider>
  )
}

export default Default
