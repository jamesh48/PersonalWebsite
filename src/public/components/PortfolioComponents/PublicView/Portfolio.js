import React from 'react';
import { useGlobalContext } from 'GlobalStore';
import { usePortfolioContext } from 'PortfolioStore';
import { NestedPortfolioStoreProvider } from 'NestedPortfolioStore';
import { handleContainerData, handleImageData } from './publicViewPortfolioUtils.js';
// import { useEffectOnlyOnUpdate } from 'GlobalUtils';
import './publicPortfolio.scss';
import ApplicationImgContainer from './ApplicationImgContainer.js';

const preventRerenderOnCardChange = (prevProps, nextProps) => {
  if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) {
    return true;
  }
}
const Portfolio =({ portfolioJSON, index }) => {
  const [{ smallWindow, mobileBrowser, portrait }] = useGlobalContext();
  const [{ outerContainerData, portfolioImages: { imageArr, allLoaded } }, portfolioDispatch] = usePortfolioContext();
  // When PortfolioJSON comes down, format it into containerData
  React.useEffect(() => {
    // console.log('portfolioJSON-> ', portfolioJSON)
    if (portfolioJSON) {
      handleContainerData(portfolioJSON, mobileBrowser, smallWindow, 'outer', portfolioDispatch)
    }
  }, [mobileBrowser, smallWindow, portrait]);

  // useEffectOnlyOnUpdate((args) => {
  //   handleContainerData(...args)
  // }, [mobileBrowser, smallWindow, portrait],
  //   [portfolioJSON, mobileBrowser, smallWindow, 'outer', portfolioDispatch]
  // );

  // Once containerData is formatted, load the images;
  React.useEffect(() => {
    // if (outerContainerData[0] && outerContainerData[0][1]?.length) {
      // console.log('outerContainerData, ', outerContainerData[0][1])
      // console.log(outerContainerData[0][1])
      // if (outerContainerData[1]?.length) {
        // console.log(outerContainerData[1])
        if (outerContainerData[index]?.length) {
          // console.log(outerContainerData[index][1])
          // First Number is the card number
          // Second number is portrait (0) landscape (1)
          handleImageData(outerContainerData[index][1], portfolioDispatch)
        }
        // handleImageData(portrait ? outerContainerData[0] : outerContainerData[1] || [], portfolioDispatch)
      // }
    // }
  }, [outerContainerData])
  // useEffectOnlyOnUpdate((args) => {
  //   handleImageData(...args);
  // },
  //   // Dependencies
  //   [outerContainerData],
  //   // Arguments
  //   [portrait ? outerContainerData[0] : outerContainerData[1], portfolioDispatch]
  // );
// if (allLoaded) {
//   console.log(imageArr[0])
// }
// if (imageArr[index]) {
//   console.log(imageArr[index])
// }
  return allLoaded ? (
    <div className={`portfolio-container portfolioFader`}>

      <h4 className='portfolioTitle'>Software Engineering Applications</h4>
      <div className='portfolioApplicationContainer'>
        {
          imageArr[index]?.map((portfolioRow, rowIndex) => {
            return (
              <div key={rowIndex} className={'portfolio-application-row'}> {
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
}

export default  React.memo(Portfolio, preventRerenderOnCardChange);