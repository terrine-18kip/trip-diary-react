import React, { useState, useContext } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
/** @jsxImportSource @emotion/react */

import Modal from 'components/elements/Modal'
import NotFound from 'components/common/NotFound'
import PlaceCard from 'components/elements/PlaceCard'
import PlaceCreate from 'components/layouts/PlaceCreate'
import PlaceDetail from 'components/layouts/PlaceDetail'
import PlaceEdit from 'components/layouts/PlaceEdit'
import { TripContext } from 'Context'
import { styles } from './styles'
import { Place } from 'types/Types'

const PlaceList: React.FC = () => {
  const { trip, places, unauthorized } = useContext(TripContext)
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [place, setPlace] = useState<Place>()

  if (unauthorized) return <NotFound />
  if (!trip) return <></>

  return (
    <div css={styles.wrapper}>
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
        <PlaceCreate tripId={trip.id} setFlag={setShowCreate} />
      </Modal>

      <Modal showModal={showDetail} setShowModal={setShowDetail}>
        {place && (
          <PlaceDetail place={place} setShowDetail={setShowDetail} setShowEdit={setShowEdit} />
        )}
      </Modal>

      <Modal showModal={showEdit} setShowModal={setShowEdit}>
        {place && (
          <PlaceEdit place={place} setShowEdit={setShowEdit} setShowDetail={setShowDetail} />
        )}
      </Modal>
    </div>
  )
}

export default PlaceList
