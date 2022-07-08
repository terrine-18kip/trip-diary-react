import { css } from '@emotion/react'

export const styles = {
  wrapper: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
  `,
  box: css`
    width: 90%;
    max-width: 500px;
    padding: 30px;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: #fafafa;
    table {
      width: 100%;
      margin-bottom: 20px;
    }
    th {
      padding: 10px 0;
      width: 80px;
      font-weight: 400;
      text-align: left;
    }
    td {
      padding: 10px 0;
      display: flex;
      align-items: center;
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
}
