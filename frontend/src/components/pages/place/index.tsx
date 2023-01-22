import React, { useLayoutEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from 'antd'

import { UserContext } from '../../../Context'
import { useGetTrip } from '../../../hooks/trip/useGetTrip'
import NotFound from '../../common/NotFound'

const PlaceList: React.FC = () => {
  const { user } = useContext(UserContext)
  const { trip, unauthorized, getTrip } = useGetTrip()

  const navigation = useNavigate()
  const params = useParams()

  useLayoutEffect(() => {
    getTrip(params.id)
  }, [user])

  if (unauthorized) {
    return <NotFound />
  }

  return trip ? (
    <div>
      <PageHeader title='行き先メモ' onBack={() => navigation(`/${trip.uniqid}`)} />
    </div>
  ) : (
    <></>
  )
}

export default PlaceList
