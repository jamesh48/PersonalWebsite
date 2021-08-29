import React from "react";
import ReactDOM from "react-dom";
import AppRouter from './components/AppRouter.js';
import { BrowserRouter as Router } from "react-router-dom";

const App = () => (
  <Router>
    <AppRouter />
  </Router>
);

ReactDOM.hydrate(<App />, document.getElementById("root"));
