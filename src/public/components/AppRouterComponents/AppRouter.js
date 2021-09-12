import React, { useState, useEffect, useCallback, useReducer } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory
} from "react-router-dom";

import Contact from '../ContactComponents/Contact.js';
import Minesweeper from '../MinesweeperComponents/Minesweeper_Proxy.js';
import Home from '../HomeComponents/Home.js';
import AppUtils from './AppUtils.js'
const { mobileBrowserFunction } = AppUtils;

import '../../main-styles/cursor.css';
import '../../main-styles/reset.scss';
import '../../main-styles/global.scss';
import '../../main-styles/main.scss';

export default (props) => {
  const [admin, setAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [mobileBrowser, setMobileBrowser] = useState(null);
  // https://stackoverflow.com/questions/53215285/how-can-i-force-a-component-to-re-render-with-hooks-in-react
  // const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleAdminSubmit = () => {
    event.preventDefault();
    setAdmin(true)
  };

  const handleAdminChange = () => {
    setAdminPass(event.target.value);
  };

  set_mobile_browser: useEffect(() => {
    const mobileBrowserTest = mobileBrowserFunction();
    setMobileBrowser(!!mobileBrowserTest);
  }, [admin]);

  return (
    <>
      <nav className={mobileBrowser ? `headerNav headerNav--Mobile` : 'headerNav'}>
        <ul>
          {/* <Link className='routerLink' to="/">Home</Link> */}
          <a className='routerLink' href='/'>Home</a>
          <a className='routerLink' href="/fullstack/minesweeper">Minesweeper</a>
          <Link className='routerLink' to="/fullstack/contact">Contact</Link>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/" render={() => (<Home {...props} mobileBrowser={mobileBrowser} />)} />
        <Route path="/fullstack/minesweeper" render={() => (<Minesweeper mobileBrowser={mobileBrowser} />)} />
        <Route path="/fullstack/contact" render={() => (<Contact mobileBrowser={mobileBrowser} />)} />
      </Switch>

    </>
  );
};
