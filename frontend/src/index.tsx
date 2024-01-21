import React from 'react'
import ReactDOM from 'react-dom'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
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
import 'antd/dist/antd.min.css'
import 'index.css'
import reportWebVitals from 'reportWebVitals'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Top />} />
      <Route path='/login' element={<Login />} />
      <Route path='/entry' element={<Entry />} />
      <Route path='/privacy_policy' element={<PrivacyPolicy />} />
      <Route path='/terms' element={<Terms />} />
      <Route path='/mypage' element={<MyPage />} />
      <Route path='/new' element={<TripCreate />} />
      <Route path='/trip' element={<Trips />} />
      <Route path='/:id/' element={<TripDetail />} />
      <Route path='/:id/edit' element={<TripEdit />} />
    </Route>,
  ),
)

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
