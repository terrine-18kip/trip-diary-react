import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  ScheduleOutlined,
  FileTextOutlined,
  LockOutlined,
  GlobalOutlined,
  UserOutlined,
} from '@ant-design/icons'
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
    column: css`
      margin-bottom: 10px;
    `,
    key: css`
      font-weight: 500;
    `,
    privacyText: css`
      margin-left: 8px;
      color: #666;
      font-size: 12px;
    `,
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
      <div css={styles.column}>
        <div css={styles.key}>
          <ScheduleOutlined /> 期間
        </div>
        <div>
          {trip.start_date} {trip.start_date && trip.end_date && '～'} {trip.end_date}
        </div>
      </div>

      <div css={styles.column}>
        <div css={styles.key}>
          <FileTextOutlined /> メモ
        </div>
        <div>{trip.memo}</div>
      </div>

      {trip.privacy_id === 1 && (
        <div css={styles.column}>
          <span css={styles.key}>
            <LockOutlined /> 非公開
          </span>
          <span css={styles.privacyText}>参加メンバーのみが閲覧可能</span>
        </div>
      )}

      {trip.privacy_id === 2 && (
        <div css={styles.column}>
          <span css={styles.key}>
            <GlobalOutlined /> 公開
          </span>
          <span css={styles.privacyText}>リンクを知っている全員が閲覧可能</span>
        </div>
      )}

      <div css={styles.column}>
        <div css={styles.key}>
          <UserOutlined /> メンバー
        </div>
        <div css={styles.members}>
          {trip.users?.map((member) => {
            return (
              <span key={member.id}>
                <MemberIcon member={member} size='small' />
              </span>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

export default TripOutline
