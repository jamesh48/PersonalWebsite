import React, { useState, useEffect, useCallback } from 'react';
import FooterItemContainer from './FooterItemContainer.js';
import './footerStyles.scss';

export default ({ footerJSON }) => {
  const [images, setImages] = useState([{ url: '', loaded: false, link: '' }]);
  const [isLoaded, setIsLoaded] = useState(false)

  const incrementImageLoad = (i) => {
    setImages(x => { x[i].loaded = true; return [...x] });
  };

  useEffect(() => {
    if (images.every(image => image.loaded)) {
      setIsLoaded(true)
    }
  }, [images]);

  useEffect(() => {
    setImages(footerJSON.map(({ imageUrl, iconLink }, loadedIndex) => {
      let img = new Image();
      img.onload = () => incrementImageLoad(loadedIndex);
      img.src = imageUrl;

      return {
        iconLink: iconLink,
        url: imageUrl,
        loaded: false
      }
    }));
  }, []);

  return isLoaded ? (
    <div id={'footerContainer'}>
      <div id={'footerItemsContainer'}>
        {images.map((iconData, iconIndex) => {
          return <FooterItemContainer key={iconIndex} iconData={iconData} />
        })}
      </div>
    </div>

  ) : null
};