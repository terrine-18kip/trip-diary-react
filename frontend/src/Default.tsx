import React from 'react'
import { Route, Routes } from 'react-router-dom'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { TripProvider, UserProvider } from 'Context'
import Header from 'components/elements/Header'
import Footer from 'components/elements/Footer'
import Top from 'components/trip/Top'
import MyPage from 'components/auth/MyPage'
import TripCreate from 'components/trip/TripCreate'
import TripDetail from 'components/trip/TripDetail'
import TripEdit from 'components/trip/TripEdit'
import PlanList from 'components/plan/PlanList'
import PlaceList from 'components/pages/Place/index'
import TripLayout from 'components/layouts/TripLayout'

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
      <TripProvider>
        <Header />
        <main css={styles.container}>
          <Routes>
            <Route path='/' element={<Top />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/new' element={<TripCreate />} />
            <Route path='/:id/' element={<TripDetail />} />
            <Route path='/:id/edit' element={<TripEdit />} />
            <Route path='/:id/' element={<TripLayout />}>
              <Route path='/:id/plan' element={<PlanList />} />
              <Route path='/:id/place' element={<PlaceList />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </TripProvider>
    </UserProvider>
  )
}

export default Default
