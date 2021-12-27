import React from 'react'

export const FooterItemContainer = ({ iconData: { url, iconLink } }) => {
  return (
    <span
      className='footerItemContainer'
      onClick={() => { window.open(iconLink) }}
    >
      <div style={{ backgroundImage: `url(${url})` }}>
      </div>
    </span>
  )

}