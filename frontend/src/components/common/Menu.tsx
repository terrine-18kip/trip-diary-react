import React, { useContext } from 'react'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { UserContext } from '../../Context'
import { useAdminAuth } from '../../hooks/auth/useAdminAuth'

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
      background-color: rgba(50, 50, 50, 0.7);
    `,
    content: css`
      padding: 20px;
      cursor: auto;
      background-color: #fafafa;
    `,
  }

  if (!user) return <></>

  return (
    <div css={styles.wrap} onClick={() => setShowMenu(false)}>
      <div css={styles.content} onClick={(e) => e.stopPropagation()}>
        <p>{user.name}</p>
        <p>旅の一覧</p>
        <a onClick={handleLogout}>ログアウト</a>
      </div>
    </div>
  )
}

export default Menu
