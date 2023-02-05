import React, { useContext, useState } from 'react'
import { PageHeader, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { UserContext } from 'Context'
import EditName from './EditName'
import EditEmail from './EditEmail'
import EditPassword from './EditPassword'

const MyPage: React.FC = () => {
  const { user } = useContext(UserContext)
  const [showEditName, setShowEditName] = useState(false)
  const [showEditEmail, setShowEditEmail] = useState(false)
  const [showEditPassword, setShowEditPassword] = useState(false)

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
    title: css`
      display: flex;
      justify-content: space-between;
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
            <div css={styles.title}>
              <b>名前</b>
              <a onClick={() => setShowEditName(true)}>変更</a>
            </div>
            <p>{user.name}</p>
          </div>

          <div>
            <div css={styles.title}>
              <b>メールアドレス</b>
              <a onClick={() => setShowEditEmail(true)}>変更</a>
            </div>
            <p>{user.email}</p>
          </div>

          <div>
            <div css={styles.title}>
              <b>パスワード</b>
              <a onClick={() => setShowEditPassword(true)}>変更</a>
            </div>
            <p>******</p>
          </div>
        </div>
      </div>

      <EditName show={showEditName} setShow={setShowEditName} />
      <EditEmail show={showEditEmail} setShow={setShowEditEmail} />
      <EditPassword show={showEditPassword} setShow={setShowEditPassword} />
    </>
  )
}

export default MyPage
