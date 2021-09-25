const combineReducers = (slices) => (state, action) => Object.keys(slices).reduce((acc, prop) => ({
  ...acc,
  [prop]: slices[prop](acc[prop], action),
}),
  state
);

const floatingButtons = (state, action) => {
  switch (action.type) {
    case 'UPDATE FLOATING BUTTONS':
      return action.payload;
    default:
      return state;
  };
};

export default combineReducers({ floatingButtons });