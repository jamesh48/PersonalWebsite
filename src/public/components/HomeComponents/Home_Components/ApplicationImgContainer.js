import React, { useState, useCallback } from 'react';
import NestedGitHubLink from './NestedGitHubLink.js';

export default ({ setHovered, appData, rowIndex, columnIndex, nestedIndicator, hovered, mobileBrowser }) => {

  const [nestedHovered, setNestedHovered] = useState(null);
  // const [determinant, setDeterminant] = useState(null);

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
      key={rowIndex}
      className={'applicationImgContainer'}
      onMouseLeave={nestedIndicator ? () => { setHovered([null, null]) } : null}
      onMouseOver={!nestedIndicator ? () => { setHovered([rowIndex, columnIndex]) } : null}

      style={{
        backgroundImage: `url(${appData.imgUrl})`,
      }}
    >
      {
        nestedIndicator ?
          appDataJSONRow.map((appRow, appRowIndex) => {
            return (
              <div className='nestedGithubRow' key={appRowIndex}>
                {appRow.map((nestedGithub, nestedIndex) => {
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
                  )
                })}

              </div>
            )
          })
          : null
      }
    </div>
  )
}