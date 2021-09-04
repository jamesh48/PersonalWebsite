import React from "react";
import ReactDOM from "react-dom";
import Footer from './components/FooterComponents/Footer.js';
ReactDOM.hydrate(<Footer footerJSON={window.__INITIAL__DATA__.footerJSON} />, document.getElementById('footerroot'));