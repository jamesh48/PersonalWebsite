// import {  } from './Actions.js';

const combineReducers = (slices) => (state, action) => Object.keys(slices).reduce((acc, prop) => ({
  ...acc,
  [prop]: slices[prop](acc[prop], action),
}),
  state
);

const reduceReducers = (...reducers) => {
  return (state, action) => reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state)
};

const adminPass = (state = '', { type, payload }) => {
  switch (type) {
    case 'UPDATE ADMIN PASS':
      return payload;
    default:
      return state;
  };
};

const adminFormShown = (state = false, { type, payload }) => {
  switch (type) {
    case 'TOGGLE ADMIN FORM SHOWN FALSE':
      return false;
    case 'TOGGLE ADMIN FORM SHOWN TRUE':
      return true;
    default:
      return state;
  }
}

export default combineReducers({ adminPass, adminFormShown });