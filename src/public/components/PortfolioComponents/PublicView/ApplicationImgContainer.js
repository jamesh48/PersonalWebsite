import React, { useState, useCallback } from 'react';
import NestedGitHubLink from './NestedGithubLink.js';
import Test from './test.js';

export default ({ setHovered, appData, rowIndex, columnIndex, nestedIndicator, hovered, mobileBrowser }) => {

  const [nestedHovered, setNestedHovered] = useState(null);
  const [loaded, isLoaded] = useState(false);

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

    loaded ? null :
      <Test
        key={rowIndex}
        nestedIndicator={nestedIndicator}
        setHovered={setHovered}
        appData={appData}
        columnIndex={columnIndex}
        hovered={hovered}
        mobileBrowser={mobileBrowser}
        appDataJSONRow={appDataJSONRow}
      />
    // <div
    //   onLoad={() => { setLoaded(true) }}
    //   key={rowIndex}
    //   className='applicationImgContainer'
    //   onMouseLeave={nestedIndicator ? () => { setHovered([null, null]) } : null}
    //   onMouseOver={!nestedIndicator ? () => { setHovered([rowIndex, columnIndex]) } : null}
    //   style={{
    //     backgroundImage: `url(${appData.imgUrl})`,
    //     backgroundColor: appData.cssStyles.backgroundColor,
    //   }}
    // >
    //   {
    //     nestedIndicator ?
    //       appDataJSONRow.map((appRow, appRowIndex) => {
    //         return (
    //           <div className='nestedGithubRow' key={appRowIndex}>
    //             {
    //               appRow.map((nestedGithub, nestedIndex) => {
    //                 return (
    //                   <NestedGitHubLink
    //                     setNestedHovered={setNestedHovered}
    //                     mobileBrowser={mobileBrowser}
    //                     nestedHovered={nestedHovered}
    //                     appRowIndex={appRowIndex}
    //                     index={nestedIndex}
    //                     nestedGithub={nestedGithub}
    //                     appData={appData}
    //                   />
    //                 );
    //               })
    //             }
    //           </div>
    //         )
    //       })
    //       : null
    //   }
    // </div>
  )
}