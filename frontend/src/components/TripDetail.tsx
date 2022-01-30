import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, Space, Button } from 'antd'
import { FormOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
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

const TripDetail: React.FC = () => {
  const [trip, setTrip] = useState<Trip>({})
  const navigation = useNavigate()
  const params = useParams()

  useEffect(() => {
    getTrip()
  }, [])

  async function getTrip() {
    try {
      const res = await axios.get(`${apiUrl}/trips/${params.id}`)
      setTrip(res.data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteTrip() {
    const result = confirm('削除しますか？')
    if (!result) {
      return
    }
    try {
      await axios.delete(`${apiUrl}/trips/${trip.id}`)
      navigation('/')
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
      <h2>☆旅の詳細☆</h2>
      <Card
        title={trip.title}
        extra={
          <Space>
            <Link key='edit' to={`/${trip.id}/edit`}>
              <Button shape='circle' icon={<FormOutlined />} />
            </Link>
            <Button
              shape='circle'
              icon={<DeleteOutlined />}
              onClick={deleteTrip}
            />
          </Space>
        }
        bordered={false}
      >
        <p>
          期間：{trip.start_date} ～ {trip.end_date}
        </p>
        <p>メモ：{trip.memo}</p>
      </Card>
    </div>
  )
}

export default TripDetail
