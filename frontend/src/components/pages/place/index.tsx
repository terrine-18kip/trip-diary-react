import React, { useState, useLayoutEffect, useContext } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
/** @jsxImportSource @emotion/react */

import Modal from '../../elements/Modal'
import NotFound from '../../common/NotFound'
import PlaceCard from '../../elements/PlaceCard'
import PlaceCreate from '../../layouts/PlaceCreate'
import PlaceDetail from '../../layouts/PlaceDetail'
import { UserContext } from '../../../Context'
import { useGetTrip } from '../../../hooks/trip/useGetTrip'
import { styles } from './styles'
import { Place } from '../../../types/Types'
import PlaceEdit from '../../layouts/PlaceEdit'

const PlaceList: React.FC = () => {
  const { user } = useContext(UserContext)
  const { trip, places, unauthorized, getTrip } = useGetTrip()
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [place, setPlace] = useState<Place>()

  useLayoutEffect(() => {
    getTrip()
  }, [user])

  if (unauthorized) return <NotFound />
  if (!trip) return <></>

  return (
    <>
      <div css={styles.places}>
        {places.map((place) => {
          return (
            <div
              key={place.id}
              onClick={() => {
                setShowDetail(true)
                setPlace(place)
              }}
            >
              <PlaceCard place={place} />
            </div>
          )
        })}
      </div>

      <div css={styles.addButton}>
        <Button
          shape='circle'
          type='ghost'
          icon={<PlusOutlined />}
          onClick={() => setShowCreate(true)}
        />
      </div>

      <Modal showModal={showCreate} setShowModal={setShowCreate}>
        <PlaceCreate tripId={trip.id} getTrip={getTrip} setFlag={setShowCreate} />
      </Modal>

      <Modal showModal={showDetail} setShowModal={setShowDetail}>
        {place && (
          <PlaceDetail
            place={place}
            getTrip={getTrip}
            setShowDetail={setShowDetail}
            setShowEdit={setShowEdit}
          />
        )}
      </Modal>

      <Modal showModal={showEdit} setShowModal={setShowEdit}>
        {place && (
          <PlaceEdit
            place={place}
            getTrip={getTrip}
            setShowEdit={setShowEdit}
            setShowDetail={setShowDetail}
          />
        )}
      </Modal>
    </>
  )
}

export default PlaceList
