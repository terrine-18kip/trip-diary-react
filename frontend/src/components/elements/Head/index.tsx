import React from 'react'
import { Helmet } from 'react-helmet-async'

type Props = {
  title?: string
}

const Head: React.FC<Props> = ({ title }) => {
  return (
    <Helmet>
      <title>
        {title
          ? `${title}｜trip diary`
          : 'trip diary - おしゃれな旅のしおりをオンラインで簡単に作成'}
      </title>
    </Helmet>
  )
}

export default Head
