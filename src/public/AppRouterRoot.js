// This was causing minesweeper to not work, so removing for now
// import '../../LogRocketConfig/config.js';
import React from "react";
import ReactDOM from "react-dom";
import { GlobalStoreProvider } from "GlobalStore";
import AppRouter from "./components/AppRouterComponents/AppRouter.js";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.hydrate(
  <GlobalStoreProvider>
    <Router>
      <AppRouter
        resumeData={window.__INITIAL__DATA__.resumeData}
        portfolioJSON={window.__INITIAL__DATA__.portfolioJSON}
      />
    </Router>
  </GlobalStoreProvider>,
  document.getElementById("root")
);
