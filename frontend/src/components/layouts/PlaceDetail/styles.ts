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
    margin-right: 10px;
    @media screen and (max-width: 768px) {
      margin-right: 2%;
    }
  `,
  name: css`
    flex: 1;
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
