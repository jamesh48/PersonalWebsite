import React, { useState, useEffect } from 'react'

export default ({ iconData: { url, link } }) => {
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