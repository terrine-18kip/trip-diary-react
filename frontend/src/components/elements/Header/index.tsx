import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { MenuOutlined, PlusOutlined } from '@ant-design/icons'
import { styles } from './styles'
/** @jsxImportSource @emotion/react */

import { UserContext } from 'Context'
import Menu from './elements/Menu'
import titleLogo from 'img/title_logo.png'

const Header: React.FC = () => {
  const { user } = useContext(UserContext)
  const locationHook = useLocation()

  const [showHeader, setShowHeader] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const toggleShowHeader = () => {
    if (locationHook.pathname === '/' && window.scrollY < window.innerHeight) {
      setShowHeader(false)
      return
    }
    setShowHeader(true)
  }

  useEffect(() => {
    setShowMenu(false)
    toggleShowHeader()
    window.addEventListener('scroll', toggleShowHeader)
    return () => window.removeEventListener('scroll', toggleShowHeader)
  }, [locationHook.pathname])

  return (
    <>
      <header css={[styles.header, !showHeader && styles.headerHidden]}>
        <Link to='/' css={styles.title}>
          <img css={styles.titleImg} src={titleLogo} />
          <div css={styles.titleText}>trip diary</div>
        </Link>
        {user ? (
          <Button type='text' shape='circle' onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <PlusOutlined rotate={45} /> : <MenuOutlined />}
          </Button>
        ) : (
          <Button type='text' shape='round'>
            <Link to='/login'>ログイン</Link>
          </Button>
        )}
      </header>
      {user && showMenu && <Menu setShowMenu={setShowMenu} />}
    </>
  )
}

export default Header
