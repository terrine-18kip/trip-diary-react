import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { UserContext } from '../../Context'
import { useAdminAuth } from '../../hooks/auth/useAdminAuth'
import MemberIcon from './MemberIcon'

type Props = {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu: React.FC<Props> = ({ setShowMenu }) => {
  const { logout } = useAdminAuth()
  const { user, getAuthUser } = useContext(UserContext)

  const handleLogout = async () => {
    await logout()
    getAuthUser()
  }

  const styles = {
    wrap: css`
      position: fixed;
      top: 48px;
      left: 0;
      width: 100%;
      height: calc(100vh - 48px);
      z-index: 1000;
      cursor: pointer;
      background-color: rgba(50, 50, 50, 0.5);
    `,
    content: css`
      padding: 0;
      padding-bottom: 10px;
      cursor: auto;
      background-color: #fafafa;
      li {
        height: 48px;
        list-style: none;
        transition: background 0.3s;
        &:hover {
          background-color: #f3f3f3;
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
          padding: 0 20px;
          line-height: 48px;
          color: #171717;
        }
      }
    `,
    iconWrap: css`
      display: flex;
      align-items: center;
    `,
  }

  if (!user) return <></>

  return (
    <div css={styles.wrap} onClick={() => setShowMenu(false)}>
      <ul css={styles.content} onClick={(e) => e.stopPropagation()}>
        <li>
          <Link to='/mypage' style={{ display: 'flex', alignItems: 'center' }}>
            <MemberIcon member={user} />
          </Link>
        </li>
        <li>
          <Link to='/'>旅の一覧</Link>
        </li>
        <li>
          <a onClick={handleLogout}>ログアウト</a>
        </li>
      </ul>
    </div>
  )
}

export default Menu
