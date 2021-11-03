// This was causing minesweeper to not work, so removing for now
// import '../../LogRocketConfig/config.js';
import React from "react";
import { Provider } from 'react-redux';
import { GlobalStoreProvider } from 'GlobalStore';
import ReactDOM from "react-dom";
import AppRouter from './components/AppRouterComponents/AppRouter.js';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.hydrate(
  <GlobalStoreProvider>
    <Router >
      <AppRouter resumeData={window.__INITIAL__DATA__.resumeData} portfolioJSON={window.__INITIAL__DATA__.portfolioJSON} />
    </Router>
  </GlobalStoreProvider>
  ,

  document.getElementById("root")
);
