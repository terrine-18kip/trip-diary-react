import React, { useState, useLayoutEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader, Button } from 'antd'
/** @jsxImportSource @emotion/react */

import PlaceCreate from '../../layouts/placeCreate'
import NotFound from '../../common/NotFound'
import { UserContext } from '../../../Context'
import { useGetTrip } from '../../../hooks/trip/useGetTrip'
import { styles } from './styles'
import PlaceCard from '../../elements/PlaceCard'

const PlaceList: React.FC = () => {
  const { user } = useContext(UserContext)
  const { trip, places, unauthorized, getTrip } = useGetTrip()
  const [showCreate, setShowCreate] = useState<boolean>(false)

  const navigation = useNavigate()
  const params = useParams()

  useLayoutEffect(() => {
    getTrip(params.id)
  }, [user])

  if (unauthorized) return <NotFound />
  if (!trip) return <></>

  return (
    <div>
      <PageHeader
        title='行き先メモ'
        onBack={() => navigation(`/${trip.uniqid}`)}
        extra={
          <Button type='primary' onClick={() => setShowCreate(true)}>
            作成
          </Button>
        }
      />

      <div css={styles.places}>
        {places.map((place) => {
          return <PlaceCard key={place.id} place={place} />
        })}
      </div>

      {showCreate && <PlaceCreate tripId={trip.id} getTrip={getTrip} setFlag={setShowCreate} />}
    </div>
  )
}

export default PlaceList
