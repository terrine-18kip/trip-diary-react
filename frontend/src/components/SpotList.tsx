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

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      {plan.spots &&
        plan.spots.map((spot) => {
          return (
            <p style={{ marginBottom: '10px' }} key={spot.id}>
              {spot.name}
            </p>
          )
        })}
      <Form onFinish={addSpot}>
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
    </div>
  )
}

export default SpotList
