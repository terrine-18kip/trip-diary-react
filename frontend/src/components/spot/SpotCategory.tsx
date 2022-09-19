import React from 'react'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

type Props = {
  category_id: number
}

const spotCategory: React.FC<Props> = ({ category_id }) => {
  const styles = {
    spotCategory: css`
      width: 30px;
      height: 30px;
      margin: 0 10px;
      border-radius: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f3f3f3;
      @media screen and (max-width: 768px) {
        margin: 0 1.5%;
      }
      img {
        width: 22px;
      }
    `,
    noCategory: css`
      width: 30px;
      height: 15px;
      margin: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      @media screen and (max-width: 768px) {
        margin: 0 1.5%;
      }
      span {
        width: 11px;
        height: 11px;
        border: 3px solid #888;
        border-radius: 100vh;
      }
    `,
  }

  return category_id === 0 ? (
    <div css={styles.noCategory}>
      <span></span>
    </div>
  ) : (
    <div css={styles.spotCategory}>
      <img src={`/img/icon_${category_id}.svg`} />
    </div>
  )
}

export default spotCategory
