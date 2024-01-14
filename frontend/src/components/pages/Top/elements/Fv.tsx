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
      margin: -45px -20px 20px;
      background-image: url(${bgImg});
      background-size: cover;
      background-position: right;
      position: relative;
      @media screen and (max-width: 768px) {
        margin: -45px -1% 20px;
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
    scroll: css`
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 20%);
    `,
    scrollText: css`
      margin-bottom: 5px;
      color: #efd6c3;
      font-size: 16px;
    `,
    scrollBar: css`
      width: 1px;
      height: 40px;
      margin: 0 auto;
      background-color: #efd6c3;
      box-shadow: 0 0 2px #ce8d75;
      animation: pathmove 1.6s ease-in-out infinite;
      @keyframes pathmove {
        0% {
          transform: scale(1, 0);
          transform-origin: 0 0;
        }
        40% {
          transform: scale(1, 1);
          transform-origin: 0 0;
        }
        40.1% {
          transform: scale(1, 1);
          transform-origin: 0 100%;
        }
        100% {
          transform: scale(1, 0);
          transform-origin: 0 100%;
        }
      }
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

        <div css={styles.scroll}>
          <div css={styles.scrollText}>scroll</div>
          <div css={styles.scrollBar}></div>
        </div>
      </section>
    </>
  )
}

export default Fv
