import React, { useContext } from 'react'
import { Button } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  PayCircleOutlined,
  LinkOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
/** @jsxImportSource @emotion/react */

import CategoryIcon from '../../elements/CategoryIcon'
import { UserContext } from '../../../Context'
import { Place } from '../../../types/Types'
import { styles } from './styles'

type Props = {
  place: Place
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>
  // setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const PlaceDetail: React.FC<Props> = ({ place, setShowDetail }) => {
  const { user } = useContext(UserContext)

  return (
    <>
      <div css={styles.button}>
        {user && (
          <>
            <Button type='text' shape='circle' disabled icon={<EditOutlined />} />
            <Button type='text' shape='circle' disabled icon={<DeleteOutlined />} />
          </>
        )}
        <Button
          type='text'
          shape='circle'
          icon={<PlusOutlined rotate={45} />}
          onClick={() => setShowDetail(false)}
        />
      </div>

      <h2 css={styles.title}>
        <div css={styles.category}>
          <CategoryIcon id={place.category_id ?? 0} />
        </div>
        <div css={styles.name}>{place.name}</div>
      </h2>

      {place.fee !== null && place.fee !== undefined && place.fee !== 0 && (
        <div css={styles.column}>
          <div css={styles.key}>
            <PayCircleOutlined /> 金額
          </div>
          <div>{place.fee.toLocaleString()} 円</div>
        </div>
      )}

      {place.link && (
        <div css={styles.column}>
          <div css={styles.key}>
            <LinkOutlined /> リンク
          </div>
          <div>
            <a css={styles.link} href={place.link} target='_blank' rel='noopener noreferrer'>
              {place.link}
            </a>
          </div>
        </div>
      )}

      {place.memo && (
        <div css={styles.column}>
          <div css={styles.key}>
            <FileTextOutlined /> メモ
          </div>
          <div>{place.memo}</div>
        </div>
      )}
    </>
  )
}

export default PlaceDetail
