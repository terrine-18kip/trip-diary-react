import { css } from '@emotion/react'

export const styles = {
  spots: css`
    width: 100%;
    margin-bottom: 10px;
  `,
  spot: css`
    padding: 5px 10px;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background 0.2s;
    background-color: rgba(250, 250, 250, 0.7);
    @media screen and (max-width: 768px) {
      padding: 5px 1.5%;
    }
    &:hover {
      background-color: #f5f5f5;
    }
  `,
  spotDrag: css`
    margin-right: 5px;
    font-size: 1.2em;
    &:hover {
      cursor: grab;
    }
  `,
  spotTime: css`
    width: 45px;
    font-size: 12px;
    text-align: center;
    p {
      margin: 0;
      line-height: 1;
    }
  `,
  spotCategory: css`
    margin: 0 10px;
    @media screen and (max-width: 768px) {
      margin: 0 1.5%;
    }
  `,
  spotName: css`
    width: 100%;
    margin-bottom: 0;
    flex: 1;
  `,
  spotFee: css`
    width: 70px;
    font-size: 13px;
    text-align: right;
    white-space: nowrap;
  `,
  spotDelete: css`
    padding: 0 5px;
    text-align: center;
  `,
  form: css`
    margin-bottom: 20px;
    text-align: center;
  `,
  disabled: css`
    cursor: auto;
  `,
}
