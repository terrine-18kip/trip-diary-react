import React from 'react'
/** @jsxImportSource @emotion/react */

import Fv from './elements/Fv'
import Content from './elements/Content'
import Entry from './elements/Entry'
import topAbout from 'img/top_about.png'
import topDevice from 'img/top_device.png'
import topPlan from 'img/top_plan.png'
import topShare from 'img/top_share.png'

const Top: React.FC = () => {
  const contents = [
    {
      id: 1,
      title: 'trip diaryについて',
      text: 'trip diaryはあなたの旅の計画をお手伝い。自由に旅行の計画を立てて、オンラインで簡単におしゃれなしおりを作ることができるwebアプリです。',
      img: topAbout,
    },
    {
      id: 2,
      title: 'アプリのダウンロード不要',
      text: 'webアプリなのでストアからのダウンロードは不要。スマホからでもPCからでも、デバイスを選ばずブラウザ上で完結します。',
      img: topDevice,
    },
    {
      id: 3,
      title: '友達と一緒に旅行を計画',
      text: '旅のしおりはユーザー登録した友達と共同編集が可能。友達をしおりに招待して一緒に旅の計画を立てましょう。',
      img: topPlan,
    },
    {
      id: 4,
      title: 'URLでかんたん共有',
      text: 'trip diaryを利用していない友達にも、URLを送るだけで計画した旅行のしおりを簡単に共有することができます。',
      img: topShare,
    },
  ]

  return (
    <>
      <Fv />
      {contents.map((content) => {
        return <Content content={content} key={content.id} />
      })}
      <Entry />
    </>
  )
}

export default Top
