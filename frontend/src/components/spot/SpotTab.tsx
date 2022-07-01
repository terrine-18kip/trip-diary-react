import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../Context'
import { MenuOutlined } from '@ant-design/icons'
import { Draggable } from 'react-beautiful-dnd'

import { styles } from '../../styles/SpotList.styles'
import { Spot } from '../../types/Types'
/** @jsxImportSource @emotion/react */

type Props = {
  spot: Spot
  index: number
  openDetail: (spot: Spot) => void
}

const SpotTab: React.FC<Props> = ({ spot, index, openDetail }) => {
  const { user } = useContext(UserContext)

  return (
    <Draggable draggableId={String(spot.id)} index={index}>
      {(provided) => (
        <li
          key={spot.id}
          css={[styles.spot]}
          onClick={() => openDetail(spot)}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          {user && <MenuOutlined css={styles.spotDrag} {...provided.dragHandleProps} />}

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

          <div css={styles.spotFee}>{spot.fee !== null && spot.fee !== 0 && `${spot.fee}円`}</div>
        </li>
      )}
    </Draggable>
  )
}

export default SpotTab
