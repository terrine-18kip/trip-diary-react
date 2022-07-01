import React, { useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { PageHeader, Button, Form, Input, DatePicker, Select, Space } from 'antd'
const { Option } = Select
import moment from 'moment'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { InputTrip, Trip } from '../../types/Types'

const apiUrl = process.env.REACT_APP_API_URL

const TripEdit: React.FC = () => {
  const [data, setData] = useState<InputTrip>({})
  const navigation = useNavigate()
  const params = useParams()

  useLayoutEffect(() => {
    getTrip()
  }, [])

  async function getTrip() {
    try {
      const res = await axios.get<Trip>(`${apiUrl}/trips/find/${params.id}`, {
        withCredentials: true,
      })
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit() {
    try {
      const res = await axios.put<Trip>(`${apiUrl}/trips/${data.id}`, data, {
        withCredentials: true,
      })
      navigation(`/${res.data.uniqid}`)
    } catch (error) {
      console.log(error)
    }
  }

  const formElement: JSX.Element = (
    <Form labelCol={{ span: 3 }} onFinish={handleSubmit} initialValues={data}>
      <Form.Item
        name='title'
        label='タイトル'
        rules={[{ required: true, message: 'タイトルを入力してください' }]}
      >
        <Input onChange={(event) => setData({ ...data, title: event.target.value })} />
      </Form.Item>
      <Form.Item label='旅の期間'>
        <DatePicker
          placeholder=''
          defaultValue={data.start_date ? moment(data.start_date, 'YYYY-MM-DD') : undefined}
          onChange={(date, dateString) => setData({ ...data, start_date: dateString })}
        />
        ～
        <DatePicker
          placeholder=''
          defaultValue={data.end_date ? moment(data.end_date, 'YYYY-MM-DD') : undefined}
          onChange={(date, dateString) => setData({ ...data, end_date: dateString })}
        />
      </Form.Item>
      <Form.Item name='memo' label='メモ'>
        <Input.TextArea onChange={(event) => setData({ ...data, memo: event.target.value })} />
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
  )

  return (
    <div>
      <PageHeader title='旅の編集' onBack={() => window.history.back()} />
      {data.id && formElement}
    </div>
  )
}

export default TripEdit
