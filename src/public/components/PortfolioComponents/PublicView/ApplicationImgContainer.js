import React, { useState, useEffect, useCallback, useReducer } from 'react';
import NestedGitHubLink from './NestedGithubLink.js';
import PortfolioUtils from './publicViewPortfolioUtils.js';
const { handleContainerData } = PortfolioUtils;

export default ({ mobileBrowser, smallWindow, nestedIndicator, hovered, hoveredDispatch, appData, rowIndex, columnIndex }) => {

  const containerDataReducer = (state, action) => {
    switch (action.type) {
      case "full":
        return action.payload;
      default:
        throw new Error();
    }
  }

  const [nestedHovered, setNestedHovered] = useState(null);
  const [appDataJSONRow, nestedContainerDataDispatch] = useReducer(containerDataReducer, []);


  useEffect(() => { handleContainerData(appData.github, mobileBrowser, smallWindow, nestedContainerDataDispatch) }, [mobileBrowser, smallWindow])

  return (
    <div
      className='applicationImgContainer'
      onMouseLeave={nestedIndicator ? () => { hoveredDispatch({ type: 'empty' }) } : null}
      onMouseOver={!nestedIndicator ? () => { hoveredDispatch({ type: 'full', payload: [rowIndex, columnIndex] }) } : null}
      style={{ backgroundImage: `url(${appData.imgUrl})`, backgroundColor: appData.cssStyles.backgroundColor }}
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
                        key={nestedIndex}
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