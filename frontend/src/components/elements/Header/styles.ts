import { css } from '@emotion/react'

export const styles = {
  header: css`
    width: 100%;
    height: 48px;
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 0 3px rgba(200, 200, 200, 0.7);
    background-color: rgba(250, 250, 250, 0.95);
    z-index: 1000;
    transition: top 0.3s, opacity 0.3s;
  `,
  headerHidden: css`
    top: -48px;
    opacity: 0.5;
  `,
  title: css`
    display: flex;
    align-items: center;
  `,
  titleImg: css`
    height: 1.5em;
    margin-right: 0.5em;
  `,
  titleText: css`
    color: #ce8d75;
    margin: 0;
    margin-bottom: 2px;
    font-size: 21px;
    font-weight: 500;
  `,
}
