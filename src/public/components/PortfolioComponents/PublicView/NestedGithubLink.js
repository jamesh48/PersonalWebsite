import React, { useState, useEffect } from 'react';
import { useNestedPortfolioContext } from 'NestedPortfolioStore';
import { useGlobalContext } from 'GlobalStore';

const NestedGithubLink = ({
  nestedColumnIndex,
  nestedRowIndex,
  outerData,
  nestedGithub
}) => {

  // This mobileBrowser variable signifies if the links need to be double pressed or not.
  const [{ mobileBrowser }] = useGlobalContext();

  const [{ nestedHovered }, nestedPortfolioDispatch] = useNestedPortfolioContext();


  const [doubleClicked, setDoubleClicked] = useState(null);

  const { cssStyles } = outerData;
  const { link, title } = nestedGithub;

  useEffect(() => {

    if (mobileBrowser && doubleClicked) {
      return window.open(link)
    }

    if (doubleClicked === true) {
      window.open(link)
    }
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
}

export default React.memo(NestedGithubLink);