import React, { useContext } from 'react'
import { UserContext } from 'Context'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const Fv: React.FC = () => {
  const { user } = useContext(UserContext)

  const styles = {
    wrapper: css`
      padding: 40px 20px;
      text-align: center;
    `,
    title: css`
      margin-bottom: 10px;
      color: #ce8d75;
      font-size: 16px;
      font-weight: 500;
    `,
    text: css`
      margin-bottom: 10px;
    `,
    button: css`
      margin-bottom: 10px;
    `,
  }

  return (
    <>
      <section css={styles.wrapper}>
        {user ? (
          <>
            <div css={styles.title}>さあ、旅をはじめよう。</div>
            <Link to='/trip'>
              <Button type='primary' shape='round'>
                旅の一覧へ
              </Button>
            </Link>
          </>
        ) : (
          <>
            <div css={styles.title}>\ まずは新規登録 /</div>
            <div css={styles.text}>
              登録も利用も完全無料。
              <br />
              さあ、旅をはじめよう。
            </div>
            <div css={styles.button}>
              <Link to='/entry'>
                <Button type='primary' shape='round'>
                  登録する
                </Button>
              </Link>
            </div>
            <div>
              ログインは<Link to='/login'>こちら</Link>
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default Fv
