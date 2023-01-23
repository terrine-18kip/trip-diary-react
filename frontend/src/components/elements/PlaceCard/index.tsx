import React from 'react'
import { Card } from 'antd'
import { PayCircleOutlined, LinkOutlined, FileTextOutlined } from '@ant-design/icons'
/** @jsxImportSource @emotion/react */

import CategoryIcon from '../CategoryIcon'
import { styles } from './styles'
import { Place } from '../../../types/Types'

type Props = {
  place: Place
}

const PlaceCard: React.FC<Props> = ({ place }) => {
  return (
    <Card size='small' key={place.id} css={styles.card}>
      <div css={styles.title}>
        <div css={styles.category}>
          <CategoryIcon id={place.category_id} />
        </div>
        <div css={styles.name}>{place.name}</div>
      </div>

      {place.fee !== null && place.fee !== undefined && place.fee !== 0 && (
        <div css={styles.column}>
          <PayCircleOutlined /> {place.fee.toLocaleString()}円
        </div>
      )}

      {place.link && (
        <div css={styles.column}>
          <LinkOutlined /> <a>{place.link}</a>
        </div>
      )}

      {place.memo && (
        <div css={styles.column}>
          <FileTextOutlined /> {place.memo}
        </div>
      )}
    </Card>
  )
}

export default PlaceCard
