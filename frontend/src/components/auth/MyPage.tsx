import React, { useContext, useEffect, useState } from 'react'
import { PageHeader, Avatar, Drawer } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { UserContext } from '../../Context'

const MyPage: React.FC = () => {
  const { user } = useContext(UserContext)
  const [showEdit, setShowEdit] = useState(false)

  const styles = {
    box: css`
      padding: 0 5%;
    `,
    boxRight: css`
      margin-bottom: 15px;
      text-align: center;
    `,
    boxLeft: css`
      width: 100%;
    `,
  }

  if (!user) return <></>

  return (
    <>
      <PageHeader title='マイページ' />

      <div css={styles.box}>
        <div css={styles.boxRight}>
          <Avatar size={80} icon={<UserOutlined />} />
        </div>
        <div css={styles.boxLeft}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b>名前</b>
              <a onClick={() => setShowEdit(true)}>変更</a>
            </div>
            <p>{user.name}</p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b>メールアドレス</b>
              <a>変更</a>
            </div>
            <p>{user.email}</p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b>パスワード</b>
              <a>変更</a>
            </div>
            <p>******</p>
          </div>
        </div>
      </div>

      <Drawer
        title='名前を編集'
        placement='bottom'
        visible={showEdit}
        onClose={() => setShowEdit(false)}
      ></Drawer>
    </>
  )
}

export default MyPage
