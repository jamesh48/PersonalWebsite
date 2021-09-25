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

const nestedContainerData = (state = [], { type, payload }) => {
  switch (type) {
    case 'FORMAT NESTED CONTAINER DATA':
      return payload;
    default:
      return state;
  };
};

const nestedHovered = (state = null, action) => {
  switch (action.type) {
    case "NESTED PORTFOLIO HOVER":
      return action.payload;
    default:
      return state;
  }
};

const nestedIndicator = (state = [], { type, payload }) => {
  switch (type) {
    case 'TOGGLE NESTED INDICATOR':
      return payload;
    default:
      return state;
  };
};

const hovered = (state = [null, null], action) => {
  switch (action.type) {
    case "SET HOVERED NULL":
      return [null, null];
    case "SET HOVERED":
      return action.payload;
    default:
      return state;
  };
};

export default combineReducers({ nestedHovered, nestedContainerData, nestedIndicator, hovered });