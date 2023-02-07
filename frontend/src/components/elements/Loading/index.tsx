import React from 'react'
import { styles, fade } from './styles'
/** @jsxImportSource @emotion/react */

const Loading: React.FC = () => {
  const squares = () => {
    const array = []
    for (let i = 0; i < 6; i++) {
      array.push(<span key={i} css={[styles.square, fade(i)]}></span>)
    }
    return array
  }

  return (
    <div css={styles.wrapper}>
      <div css={styles.icon}>{squares()}</div>
      <div css={styles.text}>Loading...</div>
    </div>
  )
}

export default Loading
