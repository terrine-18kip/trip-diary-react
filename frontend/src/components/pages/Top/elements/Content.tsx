import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

type Props = {
  content: {
    title: string
    text: string
    img: string
  }
}

const Content: React.FC<Props> = ({ content }) => {
  const styles = {
    content: css`
      padding: 20px;
      text-align: center;
    `,
    title: css`
      margin-bottom: 10px;
      color: #ce8d75;
      font-size: 16px;
      font-weight: 500;
    `,
    text: css``,
    img: css`
      width: 50%;
      max-width: 400px;
      min-width: 180px;
      margin: 0 auto;
      img {
        width: 100%;
      }
    `,
  }

  return (
    <>
      <section css={styles.content}>
        <div css={styles.img}>
          <img src={content.img} alt='' />
        </div>
        <div css={styles.title}>{content.title}</div>
        <div css={styles.text}>{content.text}</div>
      </section>
    </>
  )
}

export default Content
