import React from 'react'

export const FooterItemContainer = ({ iconData: { url, link } }) => {
  return (
    <span
      className='footerItemContainer'
      onClick={() => { window.open(link) }}
    >
      <div style={{ backgroundImage: `url(${url})` }}>
      </div>
    </span>
  )

}