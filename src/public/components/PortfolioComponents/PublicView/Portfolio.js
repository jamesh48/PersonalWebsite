import React, { useState, useEffect, useCallback } from 'react';
import ApplicationImgContainer from './test.js';

export default ({ portfolioJSON, mobileBrowser }) => {
  const [hovered, setHovered] = useState([null, null]);

  const portfolioRowJSON = portfolioJSON?.reduce((total, item, index) => {
    if (mobileBrowser) {
      total.push([item])
      return total;
    }
    if (index % 2 === 0) {
      total.push([item])
    } else {
      total[total.length - 1].push(item);
    }
    return total;
  }, []);

  const memoizedCallback = useCallback((row, column) => {
    setHovered([row, column])
  }, [hovered]);

  return (
    <div className='portfolioContainer'>
      <h4 className='portfolioTitle'>Software Engineering Applications</h4>
      <div className='portfolioApplicationContainer'>
        {
          portfolioRowJSON?.map((portfolioRow, rowIndex) => {
            return (<div key={rowIndex} className={'portfolioApplicationRow'}> {
              portfolioRow.map((appData, columnIndex) => {
                return (
                  <div key={columnIndex} className={'portfolioApplication'}>
                    <p>
                      {appData.title}
                    </p>
                    {
                      rowIndex === hovered[0] && columnIndex === hovered[1] ?
                        <ApplicationImgContainer setHovered={setHovered} appData={appData} nestedIndicator={true} hovered={hovered} mobileBrowser={mobileBrowser} />
                        :
                        <ApplicationImgContainer appData={appData} mobileBrowser={mobileBrowser} setHovered={setHovered} rowIndex={rowIndex} columnIndex={columnIndex} nestedIndicator={false} hovered={hovered} />
                    }
                  </div>
                );
              })
            }
            </div>)
          })
        }


      </div>

    </div >
  )
};