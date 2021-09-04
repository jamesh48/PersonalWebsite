import React, { useState, useEffect } from 'react';
import {
  StaticRouter as Router,
  Link,
  Route
} from "react-router-dom";

import Contact from './ContactComponents/Contact.js';
import Minesweeper from './MinesweeperComponents/Minesweeper_Proxy.js';
import Home from './HomeComponents/Home.js';

import '../main-styles/cursor.css';
import '../main-styles/reset.scss';
import '../main-styles/global.scss';
import '../main-styles/main.scss';

export default (props) => {
  const [admin, setAdmin] = useState(true);
  const [adminPass, setAdminPass] = useState('');

  const handleAdminSubmit = () => {
    event.preventDefault();
    setAdmin(true)
  }
  const handleAdminChange = () => {
    setAdminPass(event.target.value);
  }
  return (
    <>
      <nav id='headerNav'>
        <ul>
          <Link className='routerLink' to="/">Home</Link>
          <Link className='routerLink' to="/fullstack/minesweeper">Minesweeper</Link>
          <Link className='routerLink' to="/fullstack/contact">Contact</Link>
        </ul>
      </nav>

      <Route exact path="/" render={() => (<Home {...props}/>)} />
      <Route path="/fullstack/minesweeper" component={Minesweeper} />
      <Route path="/fullstack/contact" component={Contact} />
    </>
  );
};
