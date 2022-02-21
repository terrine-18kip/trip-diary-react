import React, { useState } from 'react'
import { Button } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
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
  spots?: Spot[]
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
  created_at?: string
  updated_at?: string
}

type Props = {
  plan: Plan
  getTrip: any
}

const SpotList: React.FC<Props> = ({ plan, getTrip }) => {
  const [spot, setSpot] = useState<Spot>({})
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)

  async function deleteSpot(event: React.MouseEvent, id: number | undefined) {
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
    console.log(result)
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
      &:hover {
        background-color: #f5f5f5;
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
                {plan.spots &&
                  plan.spots.map((spot, index) => {
                    return (
                      <Draggable
                        key={spot.id}
                        draggableId={String(spot.id)}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            key={spot.id}
                            css={styles.spot}
                            onClick={() => {
                              setSpot(spot)
                              setShowEdit(true)
                            }}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div css={styles.spotTime}>
                              <p>
                                {spot.start_time &&
                                  spot.start_time.slice(0, -3)}
                              </p>
                              <p>↓</p>
                              <p>
                                {spot.end_time && spot.end_time.slice(0, -3)}
                              </p>
                            </div>
                            <div css={styles.spotCategory}>
                              <img src={`/img/icon_${spot.category_id}.svg`} />
                            </div>
                            <div css={styles.spotName}>{spot.name}</div>
                            <div css={styles.spotFee}>
                              {spot.fee}
                              {spot.fee && '円'}
                            </div>
                            <div css={styles.spotDelete}>
                              <Button
                                shape='circle'
                                size='small'
                                icon={<DeleteOutlined />}
                                onClick={(event) => {
                                  deleteSpot(event, spot.id)
                                }}
                              />
                            </div>
                          </li>
                        )}
                      </Draggable>
                    )
                  })}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

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

      {showCreate && (
        <SpotCreate plan={plan} getTrip={getTrip} setFlag={setShowCreate} />
      )}
      {showEdit && (
        <SpotEdit spot={spot} getTrip={getTrip} setFlag={setShowEdit} />
      )}
    </>
  )
}

export default SpotList
