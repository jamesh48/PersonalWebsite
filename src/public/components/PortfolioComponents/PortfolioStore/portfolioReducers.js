const combineReducers = (slices) => (state, action) =>
  Object.keys(slices).reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: slices[prop](acc[prop], action),
    }),
    state
  );

const outerContainerDataTest = (existingState, update) => {
  existingState = existingState.concat([update])
  return existingState;
}

// state = []
// state = [   [   portraitData, [{}, {}, {}, {}]]   ], [portraitData, [{}, {}]]   ]
const outerContainerData = (state = [], action) => {
  switch (action.type) {
    case "FORMAT OUTER CONTAINER DATA TEST":
      return outerContainerDataTest(state.slice(0), action.payload);
    case "FORMAT OUTER CONTAINER DATA":
      return action.payload;
    default:
      return state;
  }
};

const portfolioImagesDataTest = (existingState, update) => {
  let newImageArr = existingState.imageArr.concat([update]);
  return {allLoaded: true, imageArr: newImageArr};
}

const portfolioImages = (
  state = { allLoaded: false, imageArr: []},
  { type, payload }
) => {
  switch (type) {
    case "ALL PORTFOLIO IMAGES LOADED":
      return portfolioImagesDataTest(Object.assign({}, state), payload.imageArr);
    default:
      return state;
  }
};

export default combineReducers({ outerContainerData, portfolioImages });
