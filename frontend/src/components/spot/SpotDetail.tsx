import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Space } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  PayCircleOutlined,
  LinkOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
/** @jsxImportSource @emotion/react */

import SpotCategory from './SpotCategory'
import { UserContext } from '../../Context'
import { InputSpot } from '../../types/Types'
import { styles } from '../../styles/SpotDetail.styles'
import { useDeleteSpot } from '../../hooks/spot/useDeleteSpot'

type Props = {
  spot: InputSpot
  getTrip: (id: string | undefined) => Promise<void>
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const SpotCreate: React.FC<Props> = ({ spot, getTrip, setShowDetail, setShowEdit }) => {
  const { user } = useContext(UserContext)
  const { deleteSpot } = useDeleteSpot()
  const params = useParams()

  const handleSubmitDelete = async () => {
    const res = await deleteSpot(spot.id)
    if (res) {
      await getTrip(params.id)
      setShowDetail(false)
    }
  }

  return (
    <>
      <div css={styles.button}>
        {user && (
          <>
            <Button
              type='text'
              shape='circle'
              onClick={() => setShowEdit(true)}
              icon={<EditOutlined />}
            />
            <Button
              type='text'
              shape='circle'
              onClick={() => handleSubmitDelete()}
              icon={<DeleteOutlined />}
            />
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
          <SpotCategory id={spot.category_id ?? 0} />
        </div>
        <span>{spot.name}</span>
      </h2>

      <div css={styles.timeFee}>
        {(spot.start_time || spot.end_time) && (
          <div css={styles.timeFeeContent}>
            <div css={styles.key}>
              <ClockCircleOutlined /> 時間
            </div>
            <div>
              {spot.start_time?.slice(0, -3)}
              {spot.start_time && spot.end_time && <span style={{ padding: '0 5px' }}>～</span>}
              {spot.end_time?.slice(0, -3)}
            </div>
          </div>
        )}

        {spot.fee && (
          <div css={styles.timeFeeContent}>
            <div css={styles.key}>
              <PayCircleOutlined /> 金額
            </div>
            <div>
              {spot.fee !== null &&
                spot.fee !== undefined &&
                spot.fee !== 0 &&
                `${spot.fee.toLocaleString()} 円`}
            </div>
          </div>
        )}
      </div>

      {spot.link && (
        <div css={styles.column}>
          <div css={styles.key}>
            <LinkOutlined /> リンク
          </div>
          <div>
            <a
              css={styles.link}
              href={spot.link ?? undefined}
              target='_blank'
              rel='noopener noreferrer'
            >
              {spot.link}
            </a>
          </div>
        </div>
      )}

      {spot.memo && (
        <div css={styles.column}>
          <div css={styles.key}>
            <FileTextOutlined /> メモ
          </div>
          <div>{spot.memo}</div>
        </div>
      )}
    </>
  )
}

export default SpotCreate
