import React, { useContext } from 'react'
import { UserContext } from 'Context'
import { Link } from 'react-router-dom'
import { PageHeader, Button, Row, Col, Card } from 'antd'
import { ScheduleOutlined, FileTextOutlined } from '@ant-design/icons'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Trip } from 'types/Types'

const Trips: React.FC = () => {
  const { user } = useContext(UserContext)

  const styles = {
    column: css`
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    `,
    key: css`
      margin-right: 10px;
    `,
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
      {user ? (
        <>
          <PageHeader
            title='自分の旅'
            extra={
              <Link to='/new'>
                <Button type='primary'>新しい旅</Button>
              </Link>
            }
          />

          <div style={{ padding: '0 8px' }}>
            <Row gutter={16}>
              {user.trips?.map((trip: Trip) => {
                return (
                  <Col key={trip.id} xs={24} sm={12} lg={6} style={{ marginBottom: '10px' }}>
                    <Link to={`/${trip.uniqid}`}>
                      <Card title={trip.title} hoverable bordered={false}>
                        <div css={styles.column}>
                          <div css={styles.key}>
                            <ScheduleOutlined />
                          </div>
                          <div>
                            {trip.start_date} {trip.start_date && trip.end_date && '～'}{' '}
                            {trip.end_date}
                          </div>
                        </div>

                        {trip.memo && (
                          <div css={styles.column}>
                            <div css={styles.key}>
                              <FileTextOutlined />
                            </div>
                            <div>{trip.memo}</div>
                          </div>
                        )}
                      </Card>
                    </Link>
                  </Col>
                )
              })}
            </Row>
          </div>
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

export default Trips
