
const combineReducers = (slices) => (state, action) => Object.keys(slices).reduce((acc, prop) => ({
  ...acc,
  [prop]: slices[prop](acc[prop], action),
}),
  state
);

const outerContainerData = (state = [], action) => {
  switch (action.type) {
    case "FORMAT OUTER CONTAINER DATA":
      return action.payload;
    default:
      return state;
  }
};

const portfolioImages = (state = { allLoaded: false, imageArr: [] }, { type, payload }) => {
  switch (type) {
    case 'ALL PORTFOLIO IMAGES LOADED':
      return payload;
    default:
      return state;
  }
};

export default combineReducers({ outerContainerData, portfolioImages })