
const combineReducers = (slices) => (state, action) => Object.keys(slices).reduce((acc, prop) => ({
  ...acc,
  [prop]: slices[prop](acc[prop], action),
}),
  state
);

const smileImage = (state, action) => {
  switch (action.type) {
    case 'SET SMILE IMAGE':
      return action.payload;
    default:
      throw new Error();
  };
};

export default combineReducers({ smileImage })