import React from 'react';
import { useGlobalContext } from 'GlobalStore';
import { usePortfolioContext } from 'PortfolioStore';
import { NestedPortfolioStoreProvider } from 'NestedPortfolioStore';
import { handleContainerData, handleImageData } from './publicViewPortfolioUtils.js';
import { useEffectOnlyOnUpdate } from 'GlobalUtils';
import './publicPortfolio.scss';
import ApplicationImgContainer from './ApplicationImgContainer.js';


export const Portfolio = ({ portfolioJSON }) => {

  const [{ smallWindow, mobileBrowser, portrait }] = useGlobalContext();
  const [{ outerContainerData, portfolioImages: { imageArr, allLoaded } }, portfolioDispatch] = usePortfolioContext();

  // When PortfolioJSON comes down, format it into containerData
  useEffectOnlyOnUpdate((args) => {
    handleContainerData(...args)
  }, [mobileBrowser, smallWindow, portrait],
    [portfolioJSON, mobileBrowser, smallWindow, 'outer', portfolioDispatch]
  );

  // Once containerData is formatted, load the images;
  useEffectOnlyOnUpdate((args) => {
    handleImageData(...args);
  },
    // Dependencies
    [outerContainerData],
    // Arguments
    [portrait ? outerContainerData[0] : outerContainerData[1], portfolioDispatch]
  );

  // if (allLoaded) {
  //   console.log(imageArr)
  // }
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

  ) : (<h4>Loading Portfolio...</h4>)
};