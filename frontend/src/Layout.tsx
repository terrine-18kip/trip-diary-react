import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { TripProvider, UserProvider } from 'Context'
import Header from 'components/elements/Header'
import Footer from 'components/elements/Footer'

const Layout: React.FC = () => {
  const styles = {
    container: css`
      width: 100%;
      min-height: 100vh;
      padding: 10px 20px;
      padding-top: 45px;
      background-color: #fafafa;
      @media screen and (max-width: 768px) {
        padding: 5px 1%;
        padding-top: 45px;
      }
    `,
  }

  return (
    <UserProvider>
      <TripProvider>
        <Header />
        <main css={styles.container}>
          <ScrollRestoration />
          <Outlet />
        </main>
        <Footer />
      </TripProvider>
    </UserProvider>
  )
}

export default Layout
