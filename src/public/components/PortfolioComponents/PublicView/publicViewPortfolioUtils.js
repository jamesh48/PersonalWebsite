import React, { useEffect, useRef } from 'react';
import Promise from 'bluebird';
import regeneratorRuntime from 'regenerator-runtime';
let exports = {}

exports.handleContainerData = (inputArr, mobileBrowser, smallWindow, containerDataDispatch) => {
  const containerData = inputArr?.reduce((total, item, index) => {
    if (mobileBrowser || smallWindow) {
      total.push([item])
      return total;
    }
    if (index % 2 === 0) { total.push([item]) } else { total[total.length - 1].push(item) };
    return total;
  }, []);

  containerDataDispatch({ type: 'full', payload: containerData });
};


exports.processImageArr = async (imageArr) => {
  await Promise.each(imageArr, async ([{ imgUrl }]) => {
    console.log(imgUrl)
    await new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve('x');
      // img.onerror =
      img.src = imgUrl;
    });
  })
  return;
}


exports.handleImageData = async (inputArr, imagesDispatch) => {
  const processedImages = await Promise.reduce(inputArr, async (total, row) => {
    return [...total, await Promise.mapSeries(row, async (imgData) => {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve({ ...imgData });
        img.onerror = () => {reject(new Error(`The ${imgData.title} image failed to load`))};
        img.src = imgData.imgUrl;
      });
    })]
  }, []);

  imagesDispatch({ type: 'ALL_IMAGES_LOADED', payload: { allLoaded: true, imageArr: processedImages } });
};

// https://www.robinwieruch.de/react-useeffect-only-on-update
exports.useEffectOnlyOnUpdate = (callback, dependencies, args) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      callback(args);
    } else {
      didMount.current = true;
    }
  }, [...dependencies]);
};


export default exports;
