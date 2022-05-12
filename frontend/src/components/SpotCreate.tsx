import React, { useState } from 'react'
import axios from 'axios'
import { Button, Form, Input, TimePicker, Select, InputNumber, Space } from 'antd'
const { Option } = Select
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

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
  setFlag: React.Dispatch<React.SetStateAction<boolean>>
}

const SpotCreate: React.FC<Props> = ({ plan, getTrip, setFlag }) => {
  const spotOrder: number | undefined = plan.spots[plan.spots.length - 1]?.order + 1
  const [data, setData] = useState<Spot>({
    plan_id: plan.id,
    category_id: 0,
    order: spotOrder || 0,
  })

  async function addSpot() {
    try {
      const res = await axios.post(`${apiUrl}/spots`, data, {
        withCredentials: true,
      })
      console.log(res)
      await getTrip()
      setFlag(false)
    } catch (error) {
      console.log(error)
    }
  }

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
    form: css`
      width: 90%;
      max-width: 500px;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 5px;
      text-align: center;
      background-color: #fafafa;
    `,
  }

  return (
    <div css={styles.wrapper}>
      <Form onFinish={addSpot} css={styles.form}>
        <div style={{ marginBottom: '10px' }}>
          <Input
            autoFocus
            placeholder='スポット名'
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Input
            type='time'
            placeholder='開始時間'
            onChange={(event) => setData({ ...data, start_time: event.target.value })}
          />
          <span style={{ padding: '0 5px' }}>～</span>
          <Input
            type='time'
            placeholder='終了時間'
            onChange={(event) => setData({ ...data, end_time: event.target.value })}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <Select
            placeholder='カテゴリーを選択'
            style={{ width: '100%', textAlign: 'left' }}
            onChange={(event) => setData({ ...data, category_id: event })}
          >
            <Option value={0}>なし</Option>
            <Option value={1}>スポット</Option>
            <Option value={2}>ごはん</Option>
            <Option value={3}>宿泊</Option>
            <Option value={4}>鉄道</Option>
            <Option value={5}>バス</Option>
            <Option value={6}>飛行機</Option>
            <Option value={7}>車</Option>
            <Option value={8}>徒歩</Option>
            <Option value={9}>自転車</Option>
            <Option value={10}>船</Option>
          </Select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <InputNumber
            placeholder='金額'
            style={{ width: '100%' }}
            onChange={(event) => setData({ ...data, fee: Number(event) })}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <Input
            placeholder='リンク'
            onChange={(event) => setData({ ...data, link: event.target.value })}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Input
            placeholder='メモ'
            onChange={(event) => setData({ ...data, memo: event.target.value })}
          />
        </div>

        <Space>
          <Button shape='round' htmlType='submit' type='primary'>
            登録
          </Button>
          <Button shape='round' onClick={() => setFlag(false)}>
            キャンセル
          </Button>{' '}
        </Space>
      </Form>
    </div>
  )
}

export default SpotCreate
