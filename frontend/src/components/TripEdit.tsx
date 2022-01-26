import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Form, Input, DatePicker, Space } from 'antd'
import moment from 'moment'
import '../Top.css'

const TripEdit: React.FC = () => {
  const [data, setData] = useState<any>({})
  const navigation = useNavigate()
  const params = useParams()

  useEffect(() => {
    getTrip()
  }, [])

  async function getTrip() {
    try {
      const res = await axios.get(`https://trip.18kipper.com/api/trips/${params.id}`)
      setData(res.data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  async function handleSubmit() {
    try {
      const res = await axios.put(`https://trip.18kipper.com/api/trips/${params.id}`, data)
      console.log(res)
      navigation('/')
    } catch (error) {
      console.log(error)
    }
  }

  const formElement: JSX.Element = (
    <Form labelCol={{ span: 3 }} onFinish={handleSubmit} initialValues={data}>
      <Form.Item
        name="title"
        label="タイトル"
        rules={[{ required: true, message: 'タイトルを入力してください' }]}
      >
        <Input
          onChange={(event) => setData({ ...data, title: event.target.value })}
        />
      </Form.Item>
      <Form.Item label="旅の期間">
        {data.start_date ? (
          <DatePicker
            defaultValue={moment(data.start_date, 'YYYY-MM-DD')}
            onChange={(date, dateString) =>
              setData({ ...data, start_date: dateString })
            }
          />
        ) : (
          <DatePicker
            placeholder=""
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
            placeholder=""
            onChange={(date, dateString) =>
              setData({ ...data, end_date: dateString })
            }
          />
        )}
      </Form.Item>
      <Form.Item name="memo" label="メモ">
        <Input.TextArea
          onChange={(event) => setData({ ...data, memo: event.target.value })}
        />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Space>
          <Button type="primary" htmlType="submit">
            登録
          </Button>
          <Link to="/">
            <Button htmlType="submit">キャンセル</Button>
          </Link>
        </Space>
      </Form.Item>
    </Form>
  )

  return (
    <div className="container">
      <h2>☆旅の編集☆</h2>
      {data.id && formElement}
    </div>
  )
}

export default TripEdit
