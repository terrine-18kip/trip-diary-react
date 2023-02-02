import React, { useContext, useEffect, useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Button } from 'antd'
import {
  ArrowLeftOutlined,
  ScheduleOutlined,
  PushpinOutlined,
  NodeIndexOutlined,
} from '@ant-design/icons'
import { css } from '@emotion/react'
/** @jsxImportSource @emotion/react */

import { TripContext } from '../../../Context'

const TripLayout: React.FC = () => {
  const { trip, unauthorized } = useContext(TripContext)
  const [pageName, setPageName] = useState<string>('')
  const location = useLocation()

  useEffect(() => {
    const urlArray = location.pathname.split('/')
    setPageName(urlArray.slice(-1)[0])
  }, [location.pathname])

  const styles = {
    header: css`
      margin-bottom: 10px;
    `,
    headerTitle: css`
      display: flex;
      align-items: center;
      span {
        font-size: 16px;
        font-weight: 500;
      }
    `,
    headerDate: css`
      color: #666;
      text-align: center;
    `,
    footer: css`
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      display: flex;
      background-color: #fafafa;
    `,
    footerContent: css`
      width: 50%;
      height: 36px;
      text-align: center;
      line-height: 36px;
      color: #333;
      transition: background-color 0.5s, color 0.3s;
      &:hover {
        color: #c28771;
      }
      &:active {
        background-color: #ecd4c2;
      }
    `,
    active: css`
      color: #c28771;
    `,
  }

  if (unauthorized) return <></>
  if (!trip) return <></>

  const date = `${trip.start_date ?? ''}${trip.start_date && trip.end_date ? ' ～ ' : ''}${
    trip.end_date ?? ''
  }`

  return (
    <>
      <div css={styles.header}>
        <div css={styles.headerTitle}>
          <Link to={`/${trip.uniqid}`}>
            <Button type='text' shape='circle' icon={<ArrowLeftOutlined />} />
          </Link>
          <span>{trip.title}</span>
        </div>
        {date.length > 0 && (
          <div css={styles.headerDate}>
            <ScheduleOutlined /> {date}
          </div>
        )}
      </div>

      <Outlet />

      <div css={styles.footer}>
        <Link
          to={`/${trip.uniqid}/place`}
          css={[styles.footerContent, pageName === 'place' && styles.active]}
        >
          <PushpinOutlined /> 行き先メモ
        </Link>

        <Link
          to={`/${trip.uniqid}/plan`}
          css={[styles.footerContent, pageName === 'plan' && styles.active]}
        >
          <NodeIndexOutlined /> 旅のプラン
        </Link>
      </div>
    </>
  )
}

export default TripLayout
