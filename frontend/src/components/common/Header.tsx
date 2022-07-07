import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context'
import { Button } from 'antd'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import titleLogo from '../../img/title_logo.png'
import { useAdminAuth } from '../../hooks/auth/useAdminAuth'


const Header: React.FC = () => {
  const { logout } = useAdminAuth()
  const { user } = useContext(UserContext)

  const styles = {
    container: css`
      width: 100%;
      height: 48px;
      padding: 5px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      box-shadow: 0 0 3px rgba(250, 250, 250, 0.95);
      background-color: rgba(250, 250, 250, 0.95);
      z-index: 1000;
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
      <Link to='/' css={styles.title}>
        <img css={styles.titleImg} src={titleLogo} />
        <h2 css={styles.titleText}>trip diary</h2>
      </Link>
      {user ? (
        <Button type='text' shape='round' onClick={logout}>
          ログアウト
        </Button>
      ) : (
        <Button type='text' shape='round'>
          <Link to='/login'>ログイン</Link>
        </Button>
      )}
    </div>
  )
}

export default Header
