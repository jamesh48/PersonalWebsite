import React from "react";
import ReactDOM from "react-dom";
import AppRouter from './components/AppRouter.js';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.hydrate(
  <Router >
    <AppRouter
      resumeData={window.__INITIAL__DATA__.resumeData}
      portfolioJSON={window.__INITIAL__DATA__.portfolioJSON}
    />
  </Router>, document.getElementById("root")
);
