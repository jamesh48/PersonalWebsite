const combineReducers = (slices) => (state, action) => Object.keys(slices).reduce((acc, prop) => ({
  ...acc,
  [prop]: slices[prop](acc[prop], action),
}),
  state
);

const mobileBrowser = (state = null, action) => {
  switch (action.type) {
    case 'TOGGLE MOBILE BROWSER':
      return action.payload;
    default:
      return state;
  };
};

const admin = (state = false, action) => {
  switch (action.type) {
    case 'ADMIN LOGIN':
      return true;
    case 'ADMIN LOGOUT':
      return false;
    default:
      return state;
  }
}

const smallWindow = (state = null, action) => {
  switch (action.type) {
    case 'TOGGLE SMALL WINDOW':
      return action.payload;
    default:
      return state;
  };
};


export default combineReducers({ mobileBrowser, smallWindow, admin });
