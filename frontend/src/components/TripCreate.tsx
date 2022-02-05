import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Form, Input, DatePicker, Space } from 'antd'
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
}

const TripCreate: React.FC = () => {
  const [data, setData] = useState<Trip>({})
  const navigation = useNavigate()

  async function handleSubmit() {
    try {
      const res = await axios.post(`${apiUrl}/trips`, data, {
        withCredentials: true,
      })
      console.log(res)
      navigation(`/${res.data.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    container: css`
      width: 100%;
      min-height: 100vh;
      padding: 10px 20px;
      background-color: #fafafa;
    `,
  }

  return (
    <div css={styles.container}>
      <h2>☆旅の作成☆</h2>
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
        <Form.Item style={{ textAlign: 'center' }}>
          <Space>
            <Button type='primary' htmlType='submit'>
              登録
            </Button>
            <Link to='/'>
              <Button htmlType='submit'>キャンセル</Button>
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default TripCreate
