const combineReducers = (slices) => (state, action) => Object.keys(slices).reduce((acc, prop) => ({
  ...acc,
  [prop]: slices[prop](acc[prop], action),
}),
  state
);

const hoverParams = (state = [null, null], { type, payload }) => {
  switch (type) {
    case 'UPDATE HOVER PARAMS':
      return payload;
    case 'EXIT HOVER PARAMS':
      return [null, null];
  };
};


export default combineReducers({ hoverParams });
