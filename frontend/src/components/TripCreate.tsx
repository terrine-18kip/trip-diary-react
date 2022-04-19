import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context'
import axios from 'axios'
import {
  PageHeader,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Space,
} from 'antd'
const { Option } = Select
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const apiUrl = process.env.REACT_APP_API_URL

type Trip = {
  id?: number
  title?: string
  start_date?: string
  end_date?: string
  memo?: string
  thumb?: string
  user_id?: number
  privacy_id?: number
}

const TripCreate: React.FC = () => {
  const { user } = useContext(UserContext)
  const [data, setData] = useState<Trip>({ user_id: user.id })
  const navigation = useNavigate()

  async function handleSubmit() {
    try {
      const res = await axios.post(`${apiUrl}/trips`, data, {
        withCredentials: true,
      })
      console.log(res)
      navigation(`/${res.data.uniqid}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <PageHeader title='旅の作成' onBack={() => window.history.back()} />
      <Form labelCol={{ span: 3 }} onFinish={handleSubmit}>
        <Form.Item
          name='title'
          label='タイトル'
          rules={[{ required: true, message: 'タイトルを入力してください' }]}
        >
          <Input
            onChange={(event) =>
              setData({ ...data, title: event.target.value })
            }
          />
        </Form.Item>
        <Form.Item label='旅の期間'>
          <DatePicker
            placeholder=''
            onChange={(date, dateString) =>
              setData({ ...data, start_date: dateString })
            }
          />
          ～
          <DatePicker
            placeholder=''
            onChange={(date, dateString) =>
              setData({ ...data, end_date: dateString })
            }
          />
        </Form.Item>
        <Form.Item name='memo' label='メモ'>
          <Input.TextArea
            onChange={(event) => setData({ ...data, memo: event.target.value })}
          />
        </Form.Item>
        <Form.Item
          name='privacy_id'
          label='公開設定'
          rules={[{ required: true, message: '公開設定を選択してください' }]}
        >
          <Select onChange={(event) => setData({ ...data, privacy_id: event })}>
            <Option value={1}>非公開</Option>
            <Option value={2}>公開</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Space>
            <Button type='primary' htmlType='submit'>
              登録
            </Button>
            <Button onClick={() => window.history.back()}>キャンセル</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default TripCreate
