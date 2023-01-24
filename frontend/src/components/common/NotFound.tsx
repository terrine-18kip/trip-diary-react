import React from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

const NotFound: React.FC = () => {
  const styles = {
    wrap: css`
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

  return (
    <div css={styles.wrap}>
      <InfoCircleOutlined style={{ color: '#999', fontSize: '24px' }} />
      <p>ページが見つかりませんでした</p>
    </div>
  )
}

export default NotFound
