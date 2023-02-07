import { css, Keyframes, keyframes } from '@emotion/react'

const animations: Keyframes[] = []

const setAnimations = () => {
  if (animations.length > 6) return

  const span = 8
  const duration = 40

  for (let i = 0; i < 6; i++) {
    const frame = keyframes`
      0% {
        opacity: 0;
      }
      ${i * span}% {
        opacity: 0;
      }
      ${i * span + duration}% {
        opacity: 1;
      }
      80% {
        opacity: 1;
      }
      90% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }`
    animations.push(frame)
  }
}
setAnimations()

export const fade = (n: number) => {
  return css`
    animation-name: ${animations[n]};
  `
}

export const styles = {
  wrapper: css`
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  icon: css`
    width: 10vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5vw;
  `,
  square: css`
    aspect-ratio: 1;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    &:nth-of-type(1),
    &:nth-of-type(2) {
      background-color: #c8dfe6;
    }
    &:nth-of-type(3),
    &:nth-of-type(4) {
      background-color: #efd6c3;
    }
    &:nth-of-type(5),
    &:nth-of-type(6) {
      background-color: #ce8d75;
    }
  `,
  text: css`
    margin-top: 10px;
    color: #707070;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 2px;
  `,
}
