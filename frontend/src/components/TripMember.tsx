import React, { useState } from 'react'
import axios from 'axios'
import {
  PageHeader,
  Avatar,
  Button,
  Form,
  Input,
  TimePicker,
  Select,
  InputNumber,
  Space,
} from 'antd'
import { UserOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons'
const { Option } = Select
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const apiUrl = process.env.REACT_APP_API_URL

type Trip = {
  id?: number
  title?: string
  start_date?: string | null
  end_date?: string | null
  memo?: string | null
  thumb?: string | null
  created_at?: string
  updated_at?: string
  plans?: any[]
  users?: User[]
}

type User = {
  id: number
  name: string
  email: string
}

type Props = {
  trip: Trip
  getTrip: any
  setFlag: React.Dispatch<React.SetStateAction<boolean>>
}

type Data = {
  trip_id?: number
  email?: string
}

const TripMember: React.FC<Props> = ({ trip, getTrip, setFlag }) => {
  const [data, setData] = useState<Data>({ trip_id: trip.id })

  async function addMember() {
    try {
      const res = await axios.post(`${apiUrl}/trips/add_member`, data, {
        withCredentials: true,
      })
      console.log(res)
      await getTrip()
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
    container: css`
      width: 80%;
      max-width: 720px;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 5px;
      text-align: center;
      background-color: #fafafa;
    `,
    tripMember: css`
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    `,
    form: css`
      display: flex;
    `,
  }

  return (
    <div css={styles.wrapper}>
      <div css={styles.container}>
        <PageHeader
          style={{ padding: 0, marginBottom: '16px' }}
          title='メンバーを編集'
          extra={
            <Button
              shape='circle'
              icon={<CloseOutlined />}
              onClick={() => setFlag(false)}
            />
          }
        />
        <div>
          {trip.users?.map((user) => {
            return (
              <div css={styles.tripMember} key={user.id}>
                <Avatar
                  style={{ marginRight: '5px' }}
                  icon={<UserOutlined />}
                />
                {user.name}
              </div>
            )
          })}
        </div>
        <Form css={styles.form} onFinish={addMember}>
          <Input
            placeholder='メールアドレスを入力'
            onChange={(event) =>
              setData({ ...data, email: event.target.value })
            }
          />
          <Button type='primary' htmlType='submit'>
            追加
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default TripMember
