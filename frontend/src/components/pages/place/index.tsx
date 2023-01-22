import React, { useState, useLayoutEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader, Button } from 'antd'

import PlaceCreate from '../../layouts/placeCreate'
import { UserContext } from '../../../Context'
import { useGetTrip } from '../../../hooks/trip/useGetTrip'
import NotFound from '../../common/NotFound'

const PlaceList: React.FC = () => {
  const { user } = useContext(UserContext)
  const { trip, unauthorized, getTrip } = useGetTrip()
  const [showCreate, setShowCreate] = useState<boolean>(false)

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
      <Button onClick={() => setShowCreate(true)}>作成</Button>
      {showCreate && <PlaceCreate tripId={trip.id} getTrip={getTrip} setFlag={setShowCreate} />}
    </div>
  ) : (
    <></>
  )
}

export default PlaceList
