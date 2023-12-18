import React, { useContext } from 'react'
import { UserContext } from 'Context'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import titleLogo from 'img/title_logo.png'
import bgImg from 'img/top_fv.jpg'

const Fv: React.FC = () => {
  const { user } = useContext(UserContext)

  const styles = {
    fv: css`
      height: 100vh;
      margin: -45px -20px 0;
      background-image: url(${bgImg});
      background-size: cover;
      background-position: right;
      @media screen and (max-width: 768px) {
        margin: -45px -1% 0;
      }
    `,
    title: css`
      width: fit-content;
      padding-top: 28vh;
      margin: 0 auto 12vh;
      display: flex;
      align-items: center;
      flex-direction: column;
    `,
    titleLogo: css`
      display: flex;
      align-items: center;
    `,
    titleLogoImg: css`
      height: 2em;
      margin-right: 0.5em;
    `,
    titleLogoText: css`
      color: #ce8d75;
      margin: 0;
      margin-bottom: 2px;
      font-size: 28px;
      font-weight: 600;
    `,
    titleCopy: css`
      text-align: center;
      color: #555;
    `,
    buttons: css`
      display: flex;
      align-items: center;
      flex-direction: column;
    `,
    button: css`
      margin-bottom: 15px;
    `,
  }

  return (
    <>
      <section css={styles.fv}>
        <div css={styles.title}>
          <Link to='/' css={styles.titleLogo}>
            <img css={styles.titleLogoImg} src={titleLogo} />
            <div css={styles.titleLogoText}>trip diary</div>
          </Link>
          <p css={styles.titleCopy}>楽しく おしゃれに、旅をデザイン。</p>
        </div>

        <div css={styles.buttons}>
          {user ? (
            <div>
              <Link to='/trip'>
                <Button type='primary' shape='round'>
                  旅の一覧へ
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div css={styles.button}>
                <Link to='/entry'>
                  <Button size='large' type='primary' shape='round'>
                    新規登録
                  </Button>
                </Link>
              </div>
              <div>
                <Link to='/login'>
                  <Button size='large' shape='round'>
                    ログイン
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default Fv
