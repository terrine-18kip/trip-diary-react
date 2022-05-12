import { css } from '@emotion/react'

export const styles = {
  container: css`
    width: 100%;
    min-height: 100vh;
    padding: 10px 20px;
    background-color: #fafafa;
    @media screen and (max-width: 768px) {
      padding: 5px 1%;
    }
  `,
  tripMembers: css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  `,
  tripMember: css`
    display: flex;
    align-items: center;
    margin-right: 10px;
    padding: 2px 0;
  `,
  plans: css`
    padding: 20px 10px;
    @media screen and (max-width: 768px) {
      padding: 15px 1%;
    }
  `,
  plan: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 10px;
    border-radius: 2px;
    background-color: #ecd4c2;
  `,
  planNum: css`
    margin: 0;
    cursor: pointer;
  `,
  planForm: css`
    width: 80%;
    margin: 0 auto;
  `,
  planInput: css`
    width: 55px;
    background-color: #fff;
  `,
  disabled: css`
    cursor: auto;
  `,
  unauthorized: css`
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin-left: 10px;
      margin-bottom: 0;
      color: #555;
      font-size: 16px;
      font-weight: 500;
    }
  `,
}
