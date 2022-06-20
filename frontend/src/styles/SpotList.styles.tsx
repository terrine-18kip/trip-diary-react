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
