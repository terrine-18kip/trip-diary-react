import { css } from '@emotion/react'
import { Category } from '../../../types/Types'

export const generateStyles = (category: Category) => {
  return {
    circle: css`
      width: 100%;
      height: 100%;
      border: 1px solid transparent;
      border-radius: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${category.bgColor};
      transition: border 0.3s, box-shadow 0.2s;
      img {
        width: 76%;
      }
      span {
        width: 36%;
        height: 36%;
        border: 3px solid #888;
        border-radius: 100vh;
      }
    `,
    active: css`
      border: 1px solid ${category.color};
      box-shadow: 0 0 2px ${category.color};
    `,
    hover: css`
      &:hover {
        border: 1px solid ${category.color};
      }
    `,
  }
}
