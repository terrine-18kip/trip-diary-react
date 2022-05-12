import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../Context'
import SpotCreate from './SpotCreate'
import SpotEdit from './SpotEdit'
import axios from 'axios'
import { styles } from '../styles/SpotList.styles'
import { Button } from 'antd'
import { PlusOutlined, DeleteOutlined, MenuOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
/** @jsxImportSource @emotion/react */

const apiUrl = process.env.REACT_APP_API_URL

type Plan = {
  id: number
  daily: number
  trip_id: number
  created_at?: string
  updated_at?: string
  spots: Spot[]
}

type Spot = {
  id?: number
  plan_id?: number
  start_time?: string
  end_time?: string
  category_id?: number
  name?: string
  fee?: number
  link?: string
  memo?: string
  order: number
  created_at?: string
  updated_at?: string
}

type Props = {
  plan: Plan
  getTrip: any
}

const SpotList: React.FC<Props> = ({ plan, getTrip }) => {
  const { user } = useContext(UserContext)
  const [spots, setSpots] = useState<Spot[]>(plan.spots)
  const [spot, setSpot] = useState<Spot>({ order: 0 })
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)

  useEffect(() => {
    setSpots(plan.spots)
  }, [plan.spots])

  async function deleteSpot(event: React.MouseEvent, id: number | undefined) {
    if (!user.id) {
      return
    }
    event.stopPropagation()
    const result = confirm('削除しますか？')
    if (!result) {
      return
    }
    try {
      const res = await axios.delete(`${apiUrl}/spots/${id}`, {
        withCredentials: true,
      })
      console.log(res)
      getTrip()
    } catch (error) {
      console.log(error)
    }
  }

  const onDragEnd = (result: any) => {
    if (!user.id) {
      return
    }
    const items = Array.from(spots)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    console.log('items', items)
    setSpots(items)
    updateOrder(items)
  }

  async function updateOrder(items: Spot[]) {
    if (!user.id) {
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
                    <Draggable key={spot.id} draggableId={String(spot.id)} index={index}>
                      {(provided) => (
                        <li
                          key={spot.id}
                          css={[styles.spot, !user.id && styles.disabled]}
                          onClick={() => {
                            setSpot(spot)
                            setShowEdit(true)
                          }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          {user.id && (
                            <MenuOutlined css={styles.spotDrag} {...provided.dragHandleProps} />
                          )}

                          <div css={styles.spotTime}>
                            <p>{spot.start_time?.slice(0, -3)}</p>
                            {spot.start_time && spot.end_time && <p>↓</p>}
                            <p>{spot.end_time?.slice(0, -3)}</p>
                          </div>

                          {spot.category_id ? (
                            <div css={styles.spotCategory}>
                              <img src={`/img/icon_${spot.category_id}.svg`} />
                            </div>
                          ) : (
                            <div css={styles.noCategory}>
                              <span></span>
                            </div>
                          )}

                          <div css={styles.spotName}>{spot.name}</div>

                          <div css={styles.spotFee}>
                            {spot.fee !== null && spot.fee !== 0 && `${spot.fee}円`}
                          </div>

                          <div css={styles.spotDelete}>
                            {user.id && (
                              <Button
                                shape='circle'
                                size='small'
                                icon={<DeleteOutlined />}
                                onClick={(event) => deleteSpot(event, spot.id)}
                              />
                            )}
                          </div>
                        </li>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {user.id && (
        <>
          {!showCreate && (
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Button
                shape='circle'
                icon={<PlusOutlined />}
                size='small'
                onClick={() => setShowCreate(true)}
              />
            </div>
          )}

          {showCreate && <SpotCreate plan={plan} getTrip={getTrip} setFlag={setShowCreate} />}
          {showEdit && <SpotEdit spot={spot} getTrip={getTrip} setFlag={setShowEdit} />}
        </>
      )}
    </>
  )
}

export default SpotList
