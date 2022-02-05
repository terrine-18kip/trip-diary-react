import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { PageHeader, Button, Form, Input, DatePicker, Space } from 'antd'
import moment from 'moment'
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
}

const TripEdit: React.FC = () => {
  const [data, setData] = useState<Trip>({})
  const navigation = useNavigate()
  const params = useParams()

  useEffect(() => {
    getTrip()
  }, [])

  async function getTrip() {
    try {
      const res = await axios.get(`${apiUrl}/trips/${params.id}`, {
        withCredentials: true,
      })
      setData(res.data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  async function handleSubmit() {
    try {
      const res = await axios.put(`${apiUrl}/trips/${params.id}`, data, {
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

  const formElement: JSX.Element = (
    <Form labelCol={{ span: 3 }} onFinish={handleSubmit} initialValues={data}>
      <Form.Item
        name='title'
        label='タイトル'
        rules={[{ required: true, message: 'タイトルを入力してください' }]}
      >
        <Input
          onChange={(event) => setData({ ...data, title: event.target.value })}
        />
      </Form.Item>
      <Form.Item label='旅の期間'>
        {data.start_date ? (
          <DatePicker
            defaultValue={moment(data.start_date, 'YYYY-MM-DD')}
            onChange={(date, dateString) =>
              setData({ ...data, start_date: dateString })
            }
          />
        ) : (
          <DatePicker
            placeholder=''
            onChange={(date, dateString) =>
              setData({ ...data, start_date: dateString })
            }
          />
        )}
        ～
        {data.end_date ? (
          <DatePicker
            defaultValue={moment(data.end_date, 'YYYY-MM-DD')}
            onChange={(date, dateString) =>
              setData({ ...data, end_date: dateString })
            }
          />
        ) : (
          <DatePicker
            placeholder=''
            onChange={(date, dateString) =>
              setData({ ...data, end_date: dateString })
            }
          />
        )}
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
          <Button onClick={() => window.history.back()}>キャンセル</Button>
        </Space>
      </Form.Item>
    </Form>
  )

  return (
    <div css={styles.container}>
      <PageHeader title='旅の編集' onBack={() => window.history.back()} />
      {data.id && formElement}
    </div>
  )
}

export default TripEdit
