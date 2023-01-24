import React from 'react'
import { generateStyles } from './styles'
/** @jsxImportSource @emotion/react */

import { categories } from '../../../data/SpotData'

type Props = {
  id: number
  active?: boolean
  hoverable?: boolean
}

const categoryIcon: React.FC<Props> = ({ id, active, hoverable }) => {
  const category =
    categories.find((data) => {
      return data.id === id
    }) ?? categories[0]

  const styles = generateStyles(category)

  return (
    <div css={[styles.circle, active && styles.active, hoverable && styles.hover]}>
      {id === 0 ? <span></span> : <img src={`/img/icon_${id}.svg`} />}
    </div>
  )
}

export default categoryIcon
