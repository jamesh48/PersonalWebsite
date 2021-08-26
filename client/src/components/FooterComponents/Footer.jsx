import React from 'react';
import footerStyles from './footerStyles.scss';

const { footerContainer, footerItemsContainer, footerItemContainer } = footerStyles;

export default () => {
  return (
    <div id={footerContainer}>
      <div id={footerItemsContainer}>
        {
          [
            {
              link: 'https://www.linkedin.com/in/james-hrivnak-a9a46943/',
              imageUrl: 'https://personal-website-1.s3.us-east-2.amazonaws.com/linkedinicon.png',
            },
            {
              link: 'https://www.github.com/jamesh48',
              imageUrl: 'https://personal-website-1.s3.us-east-2.amazonaws.com/githubicon.png',
            },
            {
              link: 'https://www.instagram.com/jameshrivnak',
              imageUrl: 'https://personal-website-1.s3.us-east-2.amazonaws.com/instaicon.png'
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
        }
      </div>
    </div>
  )
}