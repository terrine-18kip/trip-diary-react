import { css } from '@emotion/react'

export const styles = {
  header: css`
    margin-bottom: 10px;
  `,
  headerTitle: css`
    display: flex;
    align-items: center;
    span {
      font-size: 16px;
      font-weight: 500;
    }
  `,
  headerDate: css`
    color: #666;
    text-align: center;
  `,
  main: css`
    padding-bottom: 40px;
  `,
  footer: css`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    background-color: #fafafa;
  `,
  footerContent: css`
    width: 50%;
    height: 36px;
    text-align: center;
    line-height: 36px;
    color: #333;
    transition: background-color 0.5s, color 0.3s;
    &:hover {
      color: #c28771;
    }
    &:active {
      background-color: #ecd4c2;
    }
  `,
  active: css`
    color: #c28771;
  `,
}
