import React, { useEffect, useState, useContext } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import SpotDetail from './SpotDetail'
import SpotCreate from '../spot/SpotCreate'
import SpotEdit from './SpotEdit'
import SpotTab from './SpotTab'
import { UserContext } from '../../Context'
import { styles } from '../../styles/SpotList.styles'
import { InputSpot, Plan, Spot } from '../../types/Types'
import { useUpdateSpotOrder } from '../../hooks/spot/useUpdateSpotOrder'
import Modal from '../elements/Modal'
/** @jsxImportSource @emotion/react */

type Props = {
  plan: Plan
  getTrip: any
}

const SpotList: React.FC<Props> = ({ plan, getTrip }) => {
  const { updateOrder } = useUpdateSpotOrder()
  const { user } = useContext(UserContext)
  const [spots, setSpots] = useState<Spot[]>(plan.spots)
  const [spot, setSpot] = useState<InputSpot>({ order: 0 })
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)

  useEffect(() => {
    setSpots(plan.spots)
  }, [plan.spots])

  const onDragEnd = (result: any) => {
    if (!user) return
    const items = Array.from(spots)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setSpots(items)
    updateOrder(items)
  }

  const openSpotDetail = (spot: Spot) => {
    setSpot(spot)
    setShowDetail(true)
  }

  return (
    <>
      <div css={styles.spots}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='spot'>
            {(provided) => (
              <ul
                className='spot'
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ padding: 0 }}
              >
                {spots.map((spot, index) => {
                  return (
                    <SpotTab key={spot.id} spot={spot} index={index} openDetail={openSpotDetail} />
                  )
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <Modal showModal={showDetail} setShowModal={setShowDetail}>
        <SpotDetail
          spot={spot}
          getTrip={getTrip}
          setShowDetail={setShowDetail}
          setShowEdit={setShowEdit}
        />
      </Modal>

      {user && (
        <>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Button
              shape='circle'
              icon={<PlusOutlined />}
              size='small'
              onClick={() => setShowCreate(true)}
            />
          </div>

          <Modal showModal={showCreate} setShowModal={setShowCreate}>
            <SpotCreate plan={plan} getTrip={getTrip} setFlag={setShowCreate} />
          </Modal>

          <Modal showModal={showEdit} setShowModal={setShowEdit}>
            <SpotEdit
              spot={spot}
              getTrip={getTrip}
              setFlag={setShowEdit}
              setShowDetail={setShowDetail}
            />
          </Modal>
        </>
      )}
    </>
  )
}

export default SpotList
