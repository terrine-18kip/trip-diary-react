import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { UserContext } from '../../Context'
import { useDeleteTrip } from '../../hooks/trip/useDeleteTrip'
import { Trip } from '../../types/Types'
import MemberIcon from '../common/MemberIcon'

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
  }

  return (
    <Card
      title={trip.title}
      extra={
        user && (
          <>
            <Link key='edit' to={`/${trip.uniqid}/edit`}>
              <Button type='text' shape='circle' icon={<EditOutlined />} />
            </Link>
            <Button
              type='text'
              shape='circle'
              icon={<DeleteOutlined />}
              onClick={() => deleteTrip(trip.id)}
            />
          </>
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
        {trip.users?.map((member) => {
          return (
            <span key={member.id}>
              <MemberIcon member={member} size='small' />
            </span>
          )
        })}
      </div>
    </Card>
  )
}

export default TripOutline
