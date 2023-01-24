import { css } from '@emotion/react'

export const styles = {
  button: css`
    text-align: right;
  `,
  title: css`
    display: flex;
    align-items: center;
  `,
  category: css`
    width: 36px;
    height: 36px;
    margin: 0 10px;
    @media screen and (max-width: 768px) {
      margin: 0 2%;
    }
  `,
  timeFee: css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  `,
  timeFeeContent: css`
    width: 50%;
  `,
  key: css`
    padding-left: 2px;
    font-weight: 500;
  `,
  column: css`
    margin-bottom: 10px;
  `,
  link: css`
    overflow-wrap: break-word;
  `,
}
