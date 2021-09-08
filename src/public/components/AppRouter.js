import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory
} from "react-router-dom";

import Contact from './ContactComponents/Contact.js';
import Minesweeper from './MinesweeperComponents/Minesweeper_Proxy.js';
import Home from './HomeComponents/Home.js';

import '../main-styles/cursor.css';
import '../main-styles/reset.scss';
import '../main-styles/global.scss';
import '../main-styles/main.scss';

export default (props) => {
  const [admin, setAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState('');

  const handleAdminSubmit = () => {
    event.preventDefault();
    setAdmin(true)
  };

  const handleAdminChange = () => {
    setAdminPass(event.target.value);
  };

  return (
    <>
      <nav id='headerNav'>
        <ul>
          <Link className='routerLink' to="/">Home</Link>
          <a className='routerLink' href="/fullstack/minesweeper">Minesweeper</a>
          <Link className='routerLink' to="/fullstack/contact">Contact</Link>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/" render={() => (<Home {...props} />)} />
        <Route path="/fullstack/minesweeper" component={Minesweeper} />
        <Route path="/fullstack/contact" component={Contact} />
      </Switch>

    </>
  );
};
