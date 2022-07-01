import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../Context'
import SpotDetail from './SpotDetail'
import SpotCreate from '../spot/SpotCreate'
import SpotEdit from './SpotEdit'
import axios from 'axios'
import { styles } from '../../styles/SpotList.styles'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import SpotTab from './SpotTab'
import { InputSpot, Plan, Spot } from '../../types/Types'
/** @jsxImportSource @emotion/react */

const apiUrl = process.env.REACT_APP_API_URL

type Props = {
  plan: Plan
  getTrip: any
}

const SpotList: React.FC<Props> = ({ plan, getTrip }) => {
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
    if (!user) {
      return
    }
    const items = Array.from(spots)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    console.log('items', items)
    setSpots(items)
    updateOrder(items)
  }

  const openSpotDetail = (spot: Spot) => {
    setSpot(spot)
    setShowDetail(true)
  }

  async function updateOrder(items: Spot[]) {
    if (!user) {
      return
    }
    try {
      const res = await axios.post(`${apiUrl}/spots/order`, items, {
        withCredentials: true,
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
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

      {showDetail && (
        <SpotDetail spot={spot} setShowDetail={setShowDetail} setShowEdit={setShowEdit} />
      )}

      {user && (
        <>
          {showCreate ? (
            <SpotCreate plan={plan} getTrip={getTrip} setFlag={setShowCreate} />
          ) : (
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Button
                shape='circle'
                icon={<PlusOutlined />}
                size='small'
                onClick={() => setShowCreate(true)}
              />
            </div>
          )}
          {showEdit && (
            <SpotEdit
              spot={spot}
              getTrip={getTrip}
              setFlag={setShowEdit}
              setShowDetail={setShowDetail}
            />
          )}
        </>
      )}
    </>
  )
}

export default SpotList
