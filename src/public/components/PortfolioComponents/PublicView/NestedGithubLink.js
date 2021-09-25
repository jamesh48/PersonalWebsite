import React, { useState, useEffect } from 'react';
import { usePortfolioContext } from 'PortfolioStore';
import { useNestedPortfolioContext } from 'NestedPortfolioStore';
import { useGlobalContext } from 'GlobalStore';

export default React.memo(({
  nestedColumnIndex,
  nestedRowIndex,
  outerRowIndex,
  outerColumnIndex,
}) => {

  const [{ mobileBrowser }] = useGlobalContext();
  const [{ outerContainerData }] = usePortfolioContext();
  const [{ nestedHovered, nestedContainerData }, nestedPortfolioDispatch] = useNestedPortfolioContext();


  const [doubleClicked, setDoubleClicked] = useState(null);

  const { cssStyles } = outerContainerData[outerRowIndex][outerColumnIndex];
  const { link, title } = nestedContainerData[nestedRowIndex][nestedColumnIndex]

  useEffect(() => {

    if (mobileBrowser && doubleClicked) {
      return window.open(link)
    };

    if (doubleClicked === true) {
      window.open(link)
    };
  }, [doubleClicked]);

  useEffect(() => {
    setDoubleClicked(null);
  }, [nestedHovered])

  return (
    <div
      key={nestedColumnIndex}
      className='nestedGithubLinks'

      onMouseOver={() => {
        nestedPortfolioDispatch({
          type: 'NESTED PORTFOLIO HOVER',
          payload: (nestedRowIndex * 2) + nestedColumnIndex
        })
      }}

      onClick={() => {
        setDoubleClicked((prev) => {
          if (mobileBrowser) {
            if (prev === null) {
              return false
            } else if (prev === false) {
              return true;
            } else {
              return false;
            }
            // Regular Browser
          } else {
            return true;
          }
        })
      }
      }
      style={cssStyles}
    >
      {title}
    </div >
  )
})