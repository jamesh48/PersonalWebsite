import React, { useState, useEffect } from 'react';
const isEqual = (prevProps, nextProps) => {
  if (prevProps.nestedHovered === nextProps.nestedHovered) {
    return true;
  }
};
export default React.memo(({ index, appData: { cssStyles }, nestedGithub: { link, title },  mobileBrowser, setNestedHovered, nestedHovered, appRowIndex }) => {
  const [doubleClicked, setDoubleClicked] = useState(null);
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
      key={index}
      className='nestedGithubLinks'
      onMouseOver={() => { setNestedHovered((appRowIndex * 2) + index) }}
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
      }}
      style={cssStyles}
    >
      {title}
    </div >
  )
})