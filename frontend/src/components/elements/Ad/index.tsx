import React, { useEffect } from 'react'
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    adsbygoogle: any
  }
}

const Ad: React.FC = () => {
  useEffect(() => {
    if (window.adsbygoogle && process.env.NODE_ENV !== 'development') {
      window.adsbygoogle.push({})
    }
  }, [])

  return (
    <>
      {process.env.NODE_ENV !== 'development' ? (
        <ins
          className='adsbygoogle'
          style={{ display: 'block' }}
          data-ad-client='ca-pub-3392773491879762'
          data-ad-slot='3035637500'
          data-ad-format='auto'
          data-full-width-responsive='true'
        ></ins>
      ) : (
        <div style={{ padding: '10px', border: '1px solid #333' }}>広告</div>
      )}
    </>
  )
}

export default Ad
