import { css } from '@emotion/react'

export const styles = {
  button: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
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
