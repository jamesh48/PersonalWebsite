import React from 'react';
// import footerIconData from './footerIconData.js';
import './footerStyles.scss';

export default ({ footerJSON }) => {
  return (
    <div id={'footerContainer'}>
      <div id={'footerItemsContainer'}>
        {
          footerJSON?.map(({ iconLink, imageUrl }, index) => {
            return (
              <span key={index} className={'footerItemContainer'}
                onClick={() => { window.open(iconLink) }}
              >
                <div
                  style={{
                    backgroundImage: `url(${imageUrl})`
                  }}
                ></div>
              </span>
            );
          })
        };
      </div>
    </div>
  );
};