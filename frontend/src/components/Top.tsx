import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button, Row, Col, Card } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import titleLogo from '../img/title_logo.png'

const apiUrl = process.env.REACT_APP_API_URL

type Trip = {
  id: number
  title: string
  start_date: string | null
  end_date: string | null
  memo: string | null
  thumb: string | null
  created_at?: string
  updated_at?: string
}

const Top: React.FC = () => {
  const [trips, setTrips] = useState<Array<Trip>>([])

  useEffect(() => {
    getTrips()
  }, [])

  async function getTrips() {
    try {
      const res = await axios.get(`${apiUrl}/trips`)
      setTrips(res.data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteTrip(id: number) {
    try {
      await axios.delete(`${apiUrl}/trips/${id}`)
      alert('削除しました')
      return getTrips()
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
    title: css`
      display: flex;
      align-items: center;
    `,
    titleImg: css`
      height: 1.5em;
      margin-right: 0.5em;
    `,
    titleText: css`
      color: #ce8d75;
      margin: 0;
      margin-bottom: 2px;
    `,
  }

  return (
    <div css={styles.container}>
      <div css={styles.title}>
        <img css={styles.titleImg} src={titleLogo} />
        <h2 css={styles.titleText}>trip diary</h2>
      </div>
      <p>
        旅行の計画を立ててみんなと共有、思い出を残せるようなwebアプリを開発中です。
      </p>
      <div style={{ marginBottom: '20px' }}>
        <Link to='/new'>
          <Button type='primary'>新しい旅</Button>
        </Link>
      </div>

      <Row gutter={16}>
        {trips.map((trip: Trip) => {
          return (
            <Col
              key={trip.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              style={{ marginBottom: '10px' }}
            >
              {/* <Link to='/'> */}
              <Card
                title={trip.title}
                // hoverable
                bordered={false}
                actions={[
                  <Link key='edit' to={`${trip.id}/edit`}>
                    <EditOutlined />
                  </Link>,
                  <DeleteOutlined
                    key='delete'
                    onClick={() => {
                      deleteTrip(trip.id)
                    }}
                  />,
                ]}
              >
                <p>
                  {trip.start_date} ～ {trip.end_date}
                </p>
                <p>メモ：{trip.memo}</p>
              </Card>
              {/* </Link> */}
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default Top
