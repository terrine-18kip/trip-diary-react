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
  form: css`
    width: 90%;
    max-width: 500px;
    padding: 30px;
    margin-bottom: 20px;
    border-radius: 5px;
    text-align: center;
    background-color: #fafafa;
  `,
  radioGroup: css`
    max-width: 360px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  `,
  radio: css`
    .ant-radio {
      display: none;
    }
    &.ant-radio-wrapper {
      width: 16%;
      margin: 0 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
  icon: css`
    width: 36px;
    height: 36px;
  `,
}
