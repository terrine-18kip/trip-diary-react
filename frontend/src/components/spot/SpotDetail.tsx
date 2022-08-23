import React, { useContext } from 'react'
import { Button, Space } from 'antd'
import {
  ClockCircleOutlined,
  PayCircleOutlined,
  LinkOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
/** @jsxImportSource @emotion/react */

import { UserContext } from '../../Context'
import { InputSpot } from '../../types/Types'
import { styles } from '../../styles/SpotDetail.styles'

type Props = {
  spot: InputSpot
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const SpotCreate: React.FC<Props> = ({ spot, setShowDetail, setShowEdit }) => {
  const { user } = useContext(UserContext)

  return (
    <div css={styles.wrapper}>
      <div css={styles.box}>
        <h2 css={styles.title}>
          {spot.category_id ? (
            <div css={styles.spotCategory}>
              <img src={`/img/icon_${spot.category_id}.svg`} />
            </div>
          ) : (
            <div css={styles.noCategory}>
              <span></span>
            </div>
          )}
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
              <a css={styles.link} href={spot.link ?? undefined} target='_blank' rel='noopener noreferrer'>
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

        <div style={{ textAlign: 'center' }}>
          <Space>
            {user && (
              <Button
                shape='round'
                htmlType='submit'
                type='primary'
                onClick={() => setShowEdit(true)}
              >
                編集
              </Button>
            )}
            <Button shape='round' onClick={() => setShowDetail(false)}>
              閉じる
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default SpotCreate
