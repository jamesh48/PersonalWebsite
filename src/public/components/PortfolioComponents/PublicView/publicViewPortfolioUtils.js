import React, { useEffect, useRef } from 'react';

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


exports.handleImageData = (inputArr, imagesDispatch) => {

  let newPayload = inputArr?.reduce((total, row, firstIndex) => {
    total.push(row.map((x, secondIndex) => {
      let img = new Image();
      img.onload = () => {
        imagesDispatch({ type: 'loadedImage', payload: [firstIndex, secondIndex] })
      }
      img.src = x.imgUrl;
      return { ...x, loaded: false }
    }));
    return total;
  }, []);

  imagesDispatch({ type: 'allImages', payload: newPayload })
}

exports.testLoadedImages = (inputImages, dispatchAllLoaded) => {
  let flag = true
  for (let i = 0; i < inputImages.length; i++) {
    if (!inputImages[i].every(image => image.loaded === true)) {
      flag = false;
      break;
    }
  }

  if (flag && inputImages.length) {
    dispatchAllLoaded({ type: 'allLoaded' })
  }
}

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
