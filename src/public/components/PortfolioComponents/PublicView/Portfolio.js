import React, { useState, useReducer, useEffect, useCallback, useRef } from 'react';
import { useGlobalContext } from 'GlobalStore';
import { usePortfolioContext } from 'PortfolioStore';
import { NestedPortfolioStoreProvider } from 'NestedPortfolioStore';
import { handleContainerData, handleImageData } from './publicViewPortfolioUtils.js';
import { useEffectOnlyOnUpdate } from 'GlobalUtils';
import './publicPortfolio.scss';
import ApplicationImgContainer from './ApplicationImgContainer.js';


export default ({ portfolioJSON }) => {
  const [{ mobileBrowser, smallWindow }] = useGlobalContext();
  const [{ outerContainerData, portfolioImages: { imageArr, allLoaded } }, portfolioDispatch] = usePortfolioContext();

  // When PortfolioJSON comes down, format it into containerData
  useEffectOnlyOnUpdate((args) => {
    handleContainerData(...args)
  }, [mobileBrowser, smallWindow],
    [portfolioJSON, mobileBrowser, smallWindow, 'outer', portfolioDispatch]
  );

  // Once containerData is formatted, load the images;
  useEffectOnlyOnUpdate((args) => {
    handleImageData(...args);
  },
    // Dependencies
    [outerContainerData],
    // Arguments
    [outerContainerData, portfolioDispatch]
  );

  return allLoaded ? (
    <div className={`portfolioContainer portfolioFader`}>

      <h4 className='portfolioTitle'>Software Engineering Applications</h4>
      <div className='portfolioApplicationContainer'>
        {
          imageArr?.map((portfolioRow, rowIndex) => {
            return (
              <div key={rowIndex} className={'portfolioApplicationRow'}> {
                portfolioRow.map((appData, columnIndex) => {
                  return (
                    <div key={columnIndex} className={'portfolioApplication'}>
                      <p>
                        {appData.title}
                      </p>
                      <NestedPortfolioStoreProvider>
                        <ApplicationImgContainer
                          appData={appData}
                          rowIndex={rowIndex}
                          columnIndex={columnIndex}
                        />
                      </NestedPortfolioStoreProvider>
                    </div>
                  );
                })
              }
              </div>
            )
          })
        }
      </div>
    </div >

  ) : null
};