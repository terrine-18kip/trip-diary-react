import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../Context'
import { Link } from 'react-router-dom'
// import axios from 'axios'
import { PageHeader, Button, Row, Col, Card } from 'antd'
// import { BarsOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

// const apiUrl = process.env.REACT_APP_API_URL

type Trip = {
  id: number
  uniqid: string
  title: string
  start_date: string | null
  end_date: string | null
  memo: string | null
  thumb: string | null
  created_at?: string
  updated_at?: string
}

const Top: React.FC = () => {
  const { user } = useContext(UserContext)
  const [trips, setTrips] = useState<Array<Trip>>([])

  useEffect(() => {
    setTrips(user.trips ? user.trips : [])
  }, [user])

  const styles = {
    login: css`
      height: 50vh;
      padding: 20px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
    `,
    loginText: css`
      font-size: 16px;
      font-weight: 500;
    `,
  }

  return (
    <div>
      <p>
        旅行の計画を立ててみんなと共有、思い出を残せるようなwebアプリを開発中です。
      </p>

      {user.id ? (
        <>
          <PageHeader
            title='自分の旅'
            extra={
              <Link to='/new'>
                <Button type='primary'>新しい旅</Button>
              </Link>
            }
          />

          <Row gutter={16}>
            {trips?.map((trip: Trip) => {
              return (
                <Col
                  key={trip.id}
                  xs={24}
                  sm={12}
                  lg={6}
                  style={{ marginBottom: '10px' }}
                >
                  <Link to={`/${trip.uniqid}`}>
                    <Card title={trip.title} hoverable bordered={false}>
                      <p>
                        {trip.start_date} ～ {trip.end_date}
                      </p>
                      <p>メモ：{trip.memo}</p>
                    </Card>
                  </Link>
                </Col>
              )
            })}
          </Row>
        </>
      ) : (
        <div css={styles.login}>
          <p css={styles.loginText}>旅を作成するにはログインしてください</p>
          <p>
            <Link to='/login'>
              <Button>ログイン画面へ</Button>
            </Link>
          </p>
          <p>
            <Link to='/entry'>新規登録はこちら</Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default Top
