import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Avatar, Space, Button } from 'antd'
import { FormOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { UserContext } from '../../Context'
import { useDeleteTrip } from '../../hooks/trip/useDeleteTrip'
import { Trip } from '../../types/Types'

type Props = {
  trip: Trip
}

const TripOutline: React.FC<Props> = ({ trip }) => {
  const { user } = useContext(UserContext)
  const { deleteTrip } = useDeleteTrip()

  const styles = {
    members: css`
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    `,
    member: css`
      display: flex;
      align-items: center;
      margin-right: 10px;
      padding: 2px 0;
    `,
  }

  return (
    <Card
      title={trip.title}
      extra={
        user && (
          <Space>
            <Link key='edit' to={`/${trip.uniqid}/edit`}>
              <Button shape='circle' icon={<FormOutlined />} />
            </Link>
            <Button shape='circle' icon={<DeleteOutlined />} onClick={() => deleteTrip(trip.id)} />
          </Space>
        )
      }
      bordered={false}
    >
      <p>
        期間：{trip.start_date} ～ {trip.end_date}
      </p>
      <p>メモ：{trip.memo}</p>
      <p>公開設定：{trip.privacy_id === 2 ? '公開' : '非公開'}</p>
      <div css={styles.members}>
        メンバー：
        {trip.users?.map((user) => {
          return (
            <span css={styles.member} key={user.id}>
              <Avatar size='small' icon={<UserOutlined />} />
              {user.name}
            </span>
          )
        })}
      </div>
    </Card>
  )
}

export default TripOutline
