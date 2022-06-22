import React, { useContext } from 'react'
import { UserContext } from '../Context'
import { Button, Space } from 'antd'
import { InputSpot } from '../types/Types'
import { styles } from '../styles/SpotDetail.styles'
import { categories } from '../data/SpotData'
/** @jsxImportSource @emotion/react */

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
        <h2>{spot.name}</h2>
        <table>
          <tbody>
            <tr>
              <th>時間</th>
              <td>
                {spot.start_time?.slice(0, -3)}
                {spot.start_time && spot.end_time && <span style={{ padding: '0 5px' }}>～</span>}
                {spot.end_time?.slice(0, -3)}
              </td>
            </tr>
            <tr>
              <th>カテゴリー</th>
              <td>
                {spot.category_id ? (
                  <div css={styles.spotCategory}>
                    <img src={`/img/icon_${spot.category_id}.svg`} />
                  </div>
                ) : (
                  <div css={styles.noCategory}>
                    <span></span>
                  </div>
                )}
                <span>{categories[spot.category_id ?? 0]}</span>
              </td>
            </tr>
            <tr>
              <th>金額</th>
              <td>{spot.fee !== null && spot.fee !== 0 && `${spot.fee}円`}</td>
            </tr>
            <tr>
              <th>リンク</th>
              <td>
                <a href={spot.link ?? undefined} target='_blank' rel='noopener noreferrer'>
                  {spot.link}
                </a>
              </td>
            </tr>
            <tr>
              <th>メモ</th>
              <td>{spot.memo}</td>
            </tr>
          </tbody>
        </table>

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
