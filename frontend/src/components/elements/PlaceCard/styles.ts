import { css } from '@emotion/react'

export const styles = {
  card: css`
    margin-bottom: 5px;
    border-radius: 10px;
    cursor: pointer;
  `,
  title: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  `,
  category: css`
    width: 30px;
    height: 30px;
    margin-right: 10px;
    @media screen and (max-width: 768px) {
      margin-right: 1.5%;
    }
  `,
  name: css`
    width: 100%;
    margin-bottom: 0;
    flex: 1;
    font-weight: 500;
  `,
  column: css`
    padding-left: 5px;
    margin-bottom: 2px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  spotDelete: css`
    padding: 0 5px;
    text-align: center;
  `,
}
