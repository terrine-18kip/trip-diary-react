import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Card, Button, Dropdown, message } from 'antd'
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  ScheduleOutlined,
  FileTextOutlined,
  LockOutlined,
  GlobalOutlined,
  UserOutlined,
  MoreOutlined,
  DownOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { TripContext, UserContext } from 'Context'
import { useDeleteTrip } from 'hooks/trip/useDeleteTrip'
import MemberIcon from 'components/common/MemberIcon'
import Modal from 'components/elements/Modal'
import TripMember from './TripMember'

const TripOutline: React.FC = () => {
  const { user } = useContext(UserContext)
  const { trip } = useContext(TripContext)
  const { deleteTrip } = useDeleteTrip()

  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [showMember, setShowMember] = useState<boolean>(false)

  const styles = {
    header: css`
      display: flex;
      align-items: center;
    `,
    headerDate: css`
      display: flex;
      align-items: center;
      color: #666666;
      font-size: 12px;
      font-weight: 400;
      span {
        margin-right: 5px;
      }
    `,
    showDetail: css`
      display: grid;
      grid-template-rows: 1fr;
      transition: padding 0.3s, grid-template-rows 0.3s;
      padding: 12px;
    `,
    hideDetail: css`
      display: grid;
      grid-template-rows: 0fr;
      padding: 0 12px;
      transition: padding 0.3s, grid-template-rows 0.3s;
    `,
    column: css`
      margin-bottom: 10px;
    `,
    key: css`
      font-weight: 500;
      a {
        font-weight: 400;
        font-size: 12px;
      }
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
    iconTransition: css`
      svg {
        transition: transform 0.3s;
      }
    `,
  }

  if (!trip) {
    return <></>
  }

  const copyUrl = async () => {
    await navigator.clipboard.writeText(location.href)
    message.success('クリップボードにコピーしました')
  }

  const title = (
    <div css={styles.header}>
      <Link key='edit' to='/trip'>
        <Button type='text' shape='circle' icon={<ArrowLeftOutlined />} />
      </Link>
      <div>
        <div>{trip.title}</div>
        <div css={styles.headerDate}>
          <ScheduleOutlined />
          {trip.start_date} {trip.start_date && trip.end_date && '～'} {trip.end_date}
          {!trip.start_date && !trip.end_date && '未定'}
        </div>
      </div>
    </div>
  )

  const menu = (
    <Menu>
      <Menu.Item icon={<LinkOutlined />} onClick={copyUrl}>
        URLをコピー
      </Menu.Item>
      {user && (
        <>
          <Menu.Item icon={<EditOutlined />}>
            <Link key='edit' to={`/${trip.uniqid}/edit`}>
              旅を編集する
            </Link>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />}>
            <Link key='edit' to={`/${trip.uniqid}/edit`}>
              メンバーを編集する
            </Link>
          </Menu.Item>
          <Menu.Item danger icon={<DeleteOutlined />} onClick={() => deleteTrip(trip.id)}>
            旅を削除する
          </Menu.Item>
        </>
      )}
    </Menu>
  )

  const extra = (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type='text' shape='circle' icon={<MoreOutlined />} />
      </Dropdown>
      <Button
        type='text'
        shape='circle'
        onClick={() => setShowDetail(!showDetail)}
        icon={<DownOutlined rotate={showDetail ? 180 : 0} css={styles.iconTransition} />}
      />
    </>
  )

  const detail = (
    <div css={showDetail ? styles.showDetail : styles.hideDetail}>
      <div style={{ overflow: 'hidden' }}>
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
      </div>
    </div>
  )

  return (
    <Card title={title} extra={extra} bordered={false} size='small' bodyStyle={{ padding: 0 }}>
      {detail}
      <Modal showModal={showMember} setShowModal={setShowMember}>
        <TripMember setFlag={setShowMember} />
      </Modal>
    </Card>
  )
}

export default TripOutline
