import React from "react";
import ReactDOM from "react-dom";
import { GlobalStoreProvider } from 'GlobalStore';
import Footer from './components/FooterComponents/Footer.js';

ReactDOM.hydrate(
  <GlobalStoreProvider>
    <Footer footerJSON={window.__INITIAL__DATA__.footerJSON} />
  </GlobalStoreProvider>
  ,
  document.getElementById('footerroot')
);