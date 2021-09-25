import React, { useEffect, useRef } from 'react';
import Promise from 'bluebird';
import regeneratorRuntime from 'regenerator-runtime';

const handleContainerData = (inputArr, mobileBrowser, smallWindow, indicator, dispatch) => {
  const formattedContainerData = inputArr?.reduce((total, item, index) => {
    if (mobileBrowser || smallWindow) {
      total.push([item])
      return total;
    }
    if (index % 2 === 0) { total.push([item]) } else { total[total.length - 1].push(item) };
    return total;
  }, []);

  if (indicator === 'outer') {
    return dispatch({
      type: 'FORMAT OUTER CONTAINER DATA',
      payload: formattedContainerData
    });
  };

  if (indicator === 'inner') {
    return dispatch({
      type: 'FORMAT NESTED CONTAINER DATA',
      payload: formattedContainerData
    });
  }
};

const handleImageData = async (inputArr, portfolioDispatch) => {
  const processedImages = await Promise.reduce(inputArr, async (total, row) => {
    return [...total, await Promise.mapSeries(row, async (imgData) => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve({ ...imgData });
        img.onerror = () => { reject(new Error(`The ${imgData.title} image failed to load`)) };
        img.src = imgData.imgUrl;
      });
    })]
  }, []);

  portfolioDispatch({
    type: 'ALL PORTFOLIO IMAGES LOADED',
    payload: { allLoaded: true, imageArr: processedImages }
  });
};

export { handleContainerData, handleImageData };
