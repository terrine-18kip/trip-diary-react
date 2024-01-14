import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from 'Layout'
import Top from 'components/pages/Top'
import Login from './components/pages/Login'
import Entry from './components/pages/Entry'
import PrivacyPolicy from 'components/pages/PrivacyPolicy'
import Terms from 'components/pages/Terms'
import MyPage from 'components/auth/MyPage'
import Trips from 'components/pages/Trips'
import TripCreate from 'components/trip/TripCreate'
import TripDetail from 'components/trip/TripDetail'
import TripEdit from 'components/trip/TripEdit'
import PlanList from 'components/plan/PlanList'
import PlaceList from 'components/pages/Place/index'
import TripLayout from 'components/layouts/TripLayout'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Top />} />
          <Route path='/login' element={<Login />} />
          <Route path='/entry' element={<Entry />} />
          <Route path='/privacy_policy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/new' element={<TripCreate />} />
          <Route path='/trip' element={<Trips />} />
          <Route path='/:id/' element={<TripDetail />} />
          <Route path='/:id/edit' element={<TripEdit />} />
          <Route path='/:id/' element={<TripLayout />}>
            <Route path='/:id/plan' element={<PlanList />} />
            <Route path='/:id/place' element={<PlaceList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
