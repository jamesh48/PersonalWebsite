import React from 'react';
import footerStyles from './footerStyles.scss';

const { footerContainer, footerItemsContainer, footerItemContainer } = footerStyles;

export default () => {
  return (
    <div id={footerContainer}>
      <div id={footerItemsContainer}>
        {/* {
          [
            {
              link: 'https://www.linkedin.com/in/james-hrivnak-a9a46943/',
              imageUrl: 'images/linkedinicon.png',
            },
            {
              link: 'https://www.github.com/jamesh48',
              imageUrl: 'images/githubicon.png',
            },
            {
              link: 'https://www.instagram.com/jameshrivnak',
              imageUrl: 'images/instaicon.png'
            }
          ].map(({link, imageUrl}, index) => {
              return (
                <span className={footerItemContainer}
                  onClick={() => {window.open(link)}}
                >
                  <div
                    style={{
                      backgroundImage: `url(${imageUrl})`
                    }}
                  ></div>
                </span>
              )
            })
        } */}
      </div>
    </div>
  )
}