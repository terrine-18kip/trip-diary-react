import React, { useContext } from 'react'
import { UserContext } from '../Context'
import { Button, Space } from 'antd'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

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
  order?: number
  created_at?: string
  updated_at?: string
}

type Props = {
  spot: Spot
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const SpotCreate: React.FC<Props> = ({ spot, setShowDetail, setShowEdit }) => {
  const { user } = useContext(UserContext)

  const styles = {
    wrapper: css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1000;
    `,
    box: css`
      width: 90%;
      max-width: 500px;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 5px;
      background-color: #fafafa;
      table {
        width: 100%;
        margin-bottom: 20px;
      }
      th {
        padding: 10px 0;
        width: 80px;
        font-weight: 400;
        text-align: left;
      }
      td {
        padding: 10px 0;
        display: flex;
        align-items: center;
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
      background-color: #f3f3f3;
      @media screen and (max-width: 768px) {
        margin: 0 1.5%;
      }
      img {
        width: 22px;
      }
    `,
    noCategory: css`
      width: 30px;
      height: 15px;
      margin: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      @media screen and (max-width: 768px) {
        margin: 0 1.5%;
      }
      span {
        width: 11px;
        height: 11px;
        border: 3px solid #888;
        border-radius: 100vh;
      }
    `,
  }

  const categories = [
    'なし',
    'スポット',
    'ごはん',
    '宿泊',
    '鉄道',
    'バス',
    '飛行機',
    '車',
    '徒歩',
    '自転車',
    '船',
  ]

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
              <td>
                {spot.fee}
                {spot.fee && '円'}
              </td>
            </tr>
            <tr>
              <th>リンク</th>
              <td>
                <a href={spot.link} target='_blank' rel='noopener noreferrer'>
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
