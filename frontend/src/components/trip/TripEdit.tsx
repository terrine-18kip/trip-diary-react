import React, { useContext, useLayoutEffect, useState } from 'react'
import { PageHeader, Button, Form, Input, DatePicker, Select, Space } from 'antd'
const { Option } = Select
import moment from 'moment'
/** @jsxImportSource @emotion/react */
import { InputTrip } from '../../types/Types'
import { useUpdateTrip } from '../../hooks/trip/useUpdateTrip'
import { TripContext } from '../../Context'

const TripEdit: React.FC = () => {
  const { trip, getTrip } = useContext(TripContext)
  const { updateTrip } = useUpdateTrip()
  const [data, setData] = useState<InputTrip>({})

  useLayoutEffect(() => {
    getTrip()
  }, [])

  return (
    <div>
      <PageHeader title='旅の編集' onBack={() => window.history.back()} />

      {trip && (
        <Form
          labelCol={{ span: 3 }}
          onFinish={() => updateTrip(trip.id, data)}
          initialValues={trip}
        >
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
              defaultValue={trip.start_date ? moment(trip.start_date, 'YYYY-MM-DD') : undefined}
              onChange={(date, dateString) => setData({ ...data, start_date: dateString })}
            />
            ～
            <DatePicker
              placeholder=''
              defaultValue={trip.end_date ? moment(trip.end_date, 'YYYY-MM-DD') : undefined}
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
      )}
    </div>
  )
}

export default TripEdit
