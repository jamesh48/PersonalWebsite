import React from 'react';
import footerStyles from './footerStyles.scss';
import footerIconData from './footerIconData.js';

const { footerContainer, footerItemsContainer, footerItemContainer } = footerStyles;

export default () => {
  return (
    <div id={footerContainer}>
      <div id={footerItemsContainer}>
        {
          footerIconData.map(({iconLink, imageUrl}, index) => {
              return (
                <span className={footerItemContainer}
                  onClick={() => {window.open(iconLink)}}
                >
                  <div
                    style={{
                      backgroundImage: `url(${imageUrl})`
                    }}
                  ></div>
                </span>
              )
            })
        }
      </div>
    </div>
  )
}