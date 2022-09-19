import React from 'react'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

type Props = {
  id: number
  active?: boolean
  hoverable?: boolean
}

const spotCategory: React.FC<Props> = ({ id, active, hoverable }) => {
  const styles = {
    circle: css`
      width: 30px;
      height: 30px;
      border: 1px solid transparent;
      border-radius: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f3f3f3;
      transition: border 0.3s, box-shadow 0.2s;
      img {
        width: 76%;
      }
      span {
        width: 36%;
        height: 36%;
        background-color: #888;
        border-radius: 100vh;
      }
    `,
    active: css`
      border: 1px solid #1890ff;
      box-shadow: 0 0 2px #1890ff;
    `,
    hover: css`
      &:hover {
        border: 1px solid #1890ff;
      }
    `,
  }

  return (
    <div css={[styles.circle, active && styles.active, hoverable && styles.hover]}>
      {id === 0 ? <span></span> : <img src={`/img/icon_${id}.svg`} />}
    </div>
  )
}

export default spotCategory
