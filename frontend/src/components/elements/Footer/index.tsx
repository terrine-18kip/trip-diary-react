import React from 'react'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

const Footer: React.FC = () => {
  const styles = {
    footer: css`
      padding: 40px 20px;
      color: #fff;
      text-align: center;
      background-color: #ce8d75;
    `,
  }

  return (
    <footer css={styles.footer}>
      <p>&copy; 2023 trip diary All Rights Reserved.</p>
    </footer>
  )
}

export default Footer
