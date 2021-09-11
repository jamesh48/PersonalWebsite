import React, { useState, useReducer, useEffect, useCallback, useRef } from 'react';
import PortfolioUtils from './publicViewPortfolioUtils.js';
const { handleContainerData, handleImageData, testLoadedImages, useEffectOnlyOnUpdate } = PortfolioUtils;
import './publicPortfolio.scss';
import ApplicationImgContainer from './ApplicationImgContainer.js';


export default ({ portfolioJSON, mobileBrowser, smallWindow }) => {

  const imageReducer = (state, { type, payload }) => {
    switch (type) {
      case 'allImages':
        return payload;
      case 'loadedImage':
        const [i, j] = payload;
        let newArr = state.slice();
        newArr[i][j].loaded = true
        return [...newArr];
      default:
        throw new Error()
    }
  };

  const hoveredReducer = (state, action) => {
    switch (action.type) {
      case 'empty':
        return [null, null];
      case 'full':
        return action.payload;
      default:
        throw new Error();
    }
  };

  const allLoadedReducer = (state, { type }) => {
    switch (type) {
      case 'allLoaded':
        return true;
      default:
        throw new Error();
    }
  };

  const containerDataReducer = (state, action) => {
    switch (action.type) {
      case 'full':
        return action.payload;
      default:
        throw new Error();
    }
  };

  const [images, imagesDispatch] = useReducer(imageReducer, []);
  const [hovered, hoveredDispatch] = useReducer(hoveredReducer, [null, null])
  const [allLoaded, allLoadedDispatch] = useReducer(allLoadedReducer, false);
  const [portfolioRowJSON, containerDataDispatch] = useReducer(containerDataReducer, []);

  useEffect(() => testLoadedImages(images, allLoadedDispatch), [images]);

  useEffectOnlyOnUpdate((args) => handleImageData(...args), [portfolioRowJSON], [portfolioRowJSON, imagesDispatch]);
  useEffectOnlyOnUpdate((args) => handleContainerData(...args), [mobileBrowser, smallWindow], [portfolioJSON, mobileBrowser, smallWindow, containerDataDispatch]);

  return allLoaded ? (
    <div className={`portfolioContainer portfolioFader`}>

      <h4 className='portfolioTitle'>Software Engineering Applications</h4>
      <div className='portfolioApplicationContainer'>
        {
          images?.map((portfolioRow, rowIndex) => {
            return (<div key={rowIndex} className={'portfolioApplicationRow'}> {
              portfolioRow.map((appData, columnIndex) => {
                return (
                  <div key={columnIndex} className={'portfolioApplication'}>
                    <p>
                      {appData.title}
                    </p>
                    {
                      rowIndex === hovered[0] && columnIndex === hovered[1] ?
                        <ApplicationImgContainer
                          appData={appData}
                          mobileBrowser={mobileBrowser}
                          smallWindow={smallWindow}
                          hoveredDispatch={hoveredDispatch}
                          nestedIndicator={true}
                          hovered={hovered}
                        />
                        :
                        <ApplicationImgContainer
                          appData={appData}
                          mobileBrowser={mobileBrowser}
                          smallWindow={smallWindow}
                          hoveredDispatch={hoveredDispatch}
                          nestedIndicator={false}
                          hovered={hovered}
                          rowIndex={rowIndex}
                          columnIndex={columnIndex}
                        />
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

  ) : null
};