import React from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import titleLogo from 'img/title_logo.png'

const Footer: React.FC = () => {
  const styles = {
    footer: css`
      padding: 40px 20px;
      color: #fff;
      text-align: center;
      background-color: #ce8d75e0;
    `,
    title: css`
      display: flex;
      justify-content: center;
    `,
    titleLogo: css`
      display: flex;
      align-items: center;
    `,
    titleImg: css`
      height: 1.5em;
      margin-right: 0.5em;
    `,
    titleText: css`
      color: #ecd4c2;
      margin: 0;
      margin-bottom: 2px;
      font-size: 21px;
      font-weight: 500;
    `,
    link: css`
      margin-bottom: 10px;
      a {
        padding: 0 10px;
        color: #ecd4c2;
        transition: opacity 0.2s;
        &:hover {
          opacity: 0.7;
        }
      }
    `
  }

  return (
    <footer css={styles.footer}>
      <div css={styles.title}>
        <Link to='/' css={styles.titleLogo}>
          <img css={styles.titleImg} src={titleLogo} />
          <div css={styles.titleText}>trip diary</div>
        </Link>
      </div>
      <div css={styles.link}>
        <Link to='/privacy_policy'>プライバシーポリシー</Link>
        <Link to='/terms'>利用規約</Link>
      </div>
      <p>&copy; 2023 trip diary All Rights Reserved.</p>
    </footer>
  )
}

export default Footer
