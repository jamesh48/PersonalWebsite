import React, { useState, useEffect, useCallback } from 'react';
import NestedGitHubLink from './NestedGithubLink.js';


export default ({ mobileBrowser, nestedIndicator, hovered, setHovered, appData, rowIndex, columnIndex }) => {
  const [images, setImages] = useState([{ url: '', loaded: '' }]);
  const [nestedHovered, setNestedHovered] = useState(null);
  const [loaded, isLoaded] = useState(false);

  const handleImageLoad = (index) => {
    setImages((prev) => {
      prev[index].loaded = true;
      return [...prev];
    })
  }

  useEffect(() => {
    let link = appData.imgUrl;

    var img = new Image();
    img.onload = () => handleImageLoad(0);
    img.src = link;

    setImages([{ url: link, loaded: false }]);
  }, []);

  const memoizedCallback = useCallback((index) => {
    setNestedHovered(index);
  }, [hovered]);

  const appDataJSONRow = appData?.github.reduce((total, item, index) => {
    if (index % 2 === 0) {
      total.push([item])
    } else {
      total[total.length - 1].push(item);
    }
    return total;
  }, []);


  return (
    <div
      className='applicationImgContainer'
      onMouseLeave={nestedIndicator ? () => { setHovered([null, null]) } : null}
      onMouseOver={!nestedIndicator ? () => { setHovered([rowIndex, columnIndex]) } : null}
      style={{
        backgroundImage: `url(${images[0].url})`,
        minHeight: '300px',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: appData.cssStyles.backgroundColor
      }}
    >

      {
            nestedIndicator ?
              appDataJSONRow.map((appRow, appRowIndex) => {
                return (
                  <div className='nestedGithubRow' key={appRowIndex}>
                    {
                      appRow.map((nestedGithub, nestedIndex) => {
                        return (
                          <NestedGitHubLink
                            setNestedHovered={setNestedHovered}
                            mobileBrowser={mobileBrowser}
                            nestedHovered={nestedHovered}
                            appRowIndex={appRowIndex}
                            index={nestedIndex}
                            nestedGithub={nestedGithub}
                            appData={appData}
                          />
                        );
                      })
                    }
                  </div>
                )
              })
              : null
      }

    </div>
  )
}