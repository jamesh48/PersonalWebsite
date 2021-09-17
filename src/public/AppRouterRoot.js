import '../../LogRocketConfig/config.js';
import React from "react";
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import ReactDOM from "react-dom";
import AppRouter from './components/AppRouterComponents/AppRouter.js';
import { BrowserRouter as Router } from "react-router-dom";


const hoverParams = (state = [null, null], action) => {
  switch (action.type) {
    case "FULL":
      return action.payload;
    default:
      return state;
  }
}

const rootReducer = combineReducers({ hoverParams })
const store = createStore(rootReducer);



ReactDOM.hydrate(

  <Provider store={store}>
    <Router >
      <AppRouter resumeData={window.__INITIAL__DATA__.resumeData} portfolioJSON={window.__INITIAL__DATA__.portfolioJSON} />
    </Router>
  </Provider>,

  document.getElementById("root")
);
