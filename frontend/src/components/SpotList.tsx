import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../Context'
import { Button } from 'antd'
import { PlusOutlined, DeleteOutlined, MenuOutlined } from '@ant-design/icons'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import SpotCreate from './SpotCreate'
import SpotEdit from './SpotEdit'
import axios from 'axios'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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

  const styles = {
    spots: css`
      width: 100%;
      margin-bottom: 10px;
    `,
    spot: css`
      padding: 5px 10px;
      border-bottom: 1px solid #eaeaea;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: background 0.2s;
      background-color: rgba(250, 250, 250, 0.7);
      @media screen and (max-width: 768px) {
        padding: 5px 1.5%;
      }
      &:hover {
        background-color: #f5f5f5;
      }
    `,
    spotDrag: css`
      margin-right: 5px;
      font-size: 1.2em;
      &:hover {
        cursor: grab;
      }
    `,
    spotTime: css`
      width: 45px;
      font-size: 12px;
      text-align: center;
      p {
        margin: 0;
        line-height: 1;
      }
    `,
    spotCategory: css`
      width: 30px;
      height: 30px;
      margin: 0 10px;
      border-radius: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5f5f5;
      @media screen and (max-width: 768px) {
        margin: 0 1.5%;
      }
      img {
        width: 24px;
      }
    `,
    spotName: css`
      width: 100%;
      margin-bottom: 0;
      flex: 1;
    `,
    spotFee: css`
      width: 70px;
      font-size: 13px;
      text-align: right;
      white-space: nowrap;
    `,
    spotDelete: css`
      padding: 0 5px;
      text-align: center;
    `,
    form: css`
      margin-bottom: 20px;
      text-align: center;
    `,
    disabled: css`
      cursor: auto;
    `,
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

                          <div css={styles.spotCategory}>
                            <img src={`/img/icon_${spot.category_id}.svg`} />
                          </div>

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
