import Promise from "bluebird";
import "regenerator-runtime";

const handleContainerData = (
  inputArr,
  mobileBrowser,
  smallWindow,
  indicator,
  dispatch,
) => {

  const portraitContainerData = inputArr?.reduce((total, item) => {
    total.push([item]);
    return total;
  }, []);


  const landscapeContainerData = inputArr?.reduce((total, item, index) => {
    if (index % 2 === 0) {
      total.push([item]);
    } else {
      total[total.length - 1].push(item);
    }
    return total;
  }, []);

  if (indicator === "outer") {
    return dispatch({
      type: "FORMAT OUTER CONTAINER DATA TEST",
      payload: [portraitContainerData, landscapeContainerData],
    });
  }

  if (indicator === "inner") {
    return dispatch({
      type: "FORMAT NESTED CONTAINER DATA",
      payload: [portraitContainerData, landscapeContainerData]
    });
  }
};

const handleImageData = async (inputArr, portfolioDispatch) => {
  const processedImages = await Promise.reduce(
    inputArr,
    async (total, row) => {
      return [
        ...total,
        await Promise.mapSeries(row, async (imgData) => {
          return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => resolve({ ...imgData });
            img.onerror = () => {
              reject(new Error(`The ${imgData.title} image failed to load`));
            };
            img.src = imgData.imgUrl;
          });
        }),
      ];
    },
    []
  );

  portfolioDispatch({
    type: "ALL PORTFOLIO IMAGES LOADED",
    payload: { allLoaded: true, imageArr: processedImages },
  });
};

export { handleContainerData, handleImageData };
