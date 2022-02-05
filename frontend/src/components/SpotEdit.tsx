import React, { useState } from 'react'
import axios from 'axios'
import {
  Button,
  Form,
  Input,
  TimePicker,
  Select,
  InputNumber,
  Space,
} from 'antd'
const { Option } = Select
import moment from 'moment'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const apiUrl = process.env.REACT_APP_API_URL

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
  created_at?: string
  updated_at?: string
}

type Props = {
  spot: Spot
  getTrip: any
  setFlag: React.Dispatch<React.SetStateAction<boolean>>
}

const SpotCreate: React.FC<Props> = ({ spot, getTrip, setFlag }) => {
  const [data, setData] = useState<Spot>(spot)

  async function addSpot() {
    try {
      const res = await axios.put(`${apiUrl}/spots/${spot.id}`, data, {
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
      z-index: 100;
    `,
    form: css`
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
        <div style={{ display: 'flex' }}>
          <TimePicker
            placeholder='開始時間'
            format='HH:mm'
            size='small'
            autoFocus
            value={data.start_time ? moment(data.start_time, 'HH:mm') : null}
            onChange={(time, timeString) =>
              setData({ ...data, start_time: timeString })
            }
          />
          <TimePicker
            placeholder='終了時間'
            format='HH:mm'
            size='small'
            value={data.end_time ? moment(data.end_time, 'HH:mm') : null}
            onChange={(time, timeString) =>
              setData({ ...data, end_time: timeString })
            }
          />
          <Select
            placeholder='カテゴリーを選択'
            size='small'
            value={data.category_id}
            onChange={(event) => setData({ ...data, category_id: event })}
          >
            <Option value={1}>新幹線</Option>
            <Option value={2}>飛行機</Option>
            <Option value={3}>車</Option>
          </Select>
        </div>

        <div style={{ display: 'flex' }}>
          <Input
            placeholder='スポット名'
            size='small'
            value={data.name}
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
          <InputNumber
            placeholder='金額'
            size='small'
            value={spot.fee}
            onChange={(event) => setData({ ...data, fee: Number(event) })}
          />
        </div>

        <div style={{ display: 'flex', marginBottom: '5px' }}>
          <Input
            placeholder='リンク'
            size='small'
            value={spot.link}
            onChange={(event) => setData({ ...data, link: event.target.value })}
          />
          <Input
            placeholder='メモ'
            size='small'
            value={spot.memo}
            onChange={(event) => setData({ ...data, memo: event.target.value })}
          />
        </div>
        <Space>
          <Button shape='round' size='small' htmlType='submit' type='primary'>
            更新
          </Button>
          <Button shape='round' size='small' onClick={() => setFlag(false)}>
            キャンセル
          </Button>{' '}
        </Space>
      </Form>
    </div>
  )
}

export default SpotCreate
