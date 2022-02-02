import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Button,
  Form,
  Input,
  TimePicker,
  Select,
  Space,
  InputNumber,
} from 'antd'
const { Option } = Select
import { PlusOutlined } from '@ant-design/icons'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const apiUrl = process.env.REACT_APP_API_URL

type Plan = {
  id: number
  daily: number
  trip_id: number
  created_at?: string
  updated_at?: string
  spots?: any[]
}

type Props = {
  plan: Plan
  getTrip: any
}

const SpotList: React.FC<Props> = ({ plan, getTrip }) => {
  const [data, setData] = useState<any>({ plan_id: plan.id })

  async function addSpot() {
    try {
      const res = await axios.post(`${apiUrl}/spots`, data)
      console.log(res)
      getTrip()
    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    spots: css`
      width: 100%;
      margin-bottom: 20px;
    `,
    spot: css`
      padding: 5px 10px;
      border-bottom: 1px solid #eaeaea;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
    spotTime: css`
      width: 50px;
      font-size: 12px;
      text-align: center;
      p {
        margin: 0;
        line-height: 1;
      }
    `,
    spotCategory: css`
      width: 50px;
      text-align: center;
    `,
    spotName: css`
      width: 100%;
      margin-bottom: 0;
    `,
    spotFee: css`
      width: 70px;
      font-size: 13px;
      text-align: right;
    `,
    form: css`
      margin-bottom: 20px;
      text-align: center;
    `
  }

  return (
    <>
      <div css={styles.spots}>
        {plan.spots &&
          plan.spots.map((spot) => {
            return (
              <div key={spot.id} css={styles.spot}>
                <div css={styles.spotTime}>
                  <p>{spot.start_time && spot.start_time.slice(0, -3)}</p>
                  <p>↓</p>
                  <p>{spot.end_time && spot.end_time.slice(0, -3)}</p>
                </div>
                <div css={styles.spotCategory}>{spot.category_id}</div>
                <div css={styles.spotName}>{spot.name}</div>
                <div css={styles.spotFee}>
                  {spot.fee}
                  {spot.fee && '円'}
                </div>
              </div>
            )
          })}
      </div>
      <Form onFinish={addSpot} css={styles.form}>
        <div style={{ display: 'flex' }}>
          <TimePicker
            placeholder='開始時間'
            format='HH:mm'
            size='small'
            onChange={(time, timeString) =>
              setData({ ...data, start_time: timeString })
            }
          />
          <TimePicker
            placeholder='終了時間'
            format='HH:mm'
            size='small'
            onChange={(time, timeString) =>
              setData({ ...data, end_time: timeString })
            }
          />
          <Select
            placeholder='カテゴリーを選択'
            size='small'
            onChange={(event) => setData({ ...data, category_id: event })}
          >
            <Option value='1'>新幹線</Option>
            <Option value='2'>飛行機</Option>
            <Option value='3'>車</Option>
          </Select>
        </div>

        <div style={{ display: 'flex' }}>
          <Input
            placeholder='スポット名'
            size='small'
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
          <InputNumber
            placeholder='金額'
            size='small'
            onChange={(event) => setData({ ...data, fee: event })}
          />
        </div>

        <div style={{ display: 'flex' }}>
          <Input
            placeholder='リンク'
            size='small'
            onChange={(event) => setData({ ...data, link: event.target.value })}
          />
          <Input
            placeholder='メモ'
            size='small'
            onChange={(event) => setData({ ...data, memo: event.target.value })}
          />
        </div>
        <Button
          shape='circle'
          icon={<PlusOutlined />}
          size='small'
          htmlType='submit'
        />
      </Form>
    </>
  )
}

export default SpotList
