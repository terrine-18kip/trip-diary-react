import React from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { User } from '../../types/Types'
import { AvatarSize } from 'antd/lib/avatar/SizeContext'

type Props = {
  member: User
  size?: AvatarSize
}

const MemberIcon: React.FC<Props> = ({ member, size }) => {
  const styles = {
    member: css`
      display: flex;
      align-items: center;
      margin-right: 8px;
      padding: 2px 0;
    `,
    name: css`
      margin-left: 5px;
      color: #171717;
    `,
  }
  return (
    <span css={styles.member}>
      <Avatar size={size ?? 'default'} icon={<UserOutlined />} />
      <span css={styles.name}>{member.name}</span>
    </span>
  )
}

export default MemberIcon
