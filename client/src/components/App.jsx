import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './HomeComponents/Home.jsx';
import Blog from './BlogComponents/Blog.jsx';
import Contact from './ContactComponents/Contact.jsx';
import Minesweeper from './MinesweeperComponents/Minesweeper_Proxy.jsx';
import AdminForm from './AdminForm.jsx';

import '../main-styles/reset.scss';
import '../main-styles/global.scss';
import style from '../main-styles/main.scss';
import globalStyles from '../main-styles/global.scss';
const { routerLink } = style;

export default () => {

  const [admin, setAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [mousePosition, setMousePosition] = useState([null, null]);

  // const handleMouseMove = () => {
  //   setMousePosition([event.clientX, event.clientY]);
  // };


  const handleAdminSubmit = () => {
    event.preventDefault();
    setAdmin(true)
  }
  const handleAdminChange = () => {
    setAdminPass(event.target.value);
  }
  return (
    // <div onMouseMove={handleMouseMove}>

      <Router>
        <nav>
          <ul>
            <Link className={routerLink} to='/'>Home</Link>
            {/* <Link className={routerLink} to='/blog'>Blog</Link> */}
            <Link className={routerLink} to='/minesweeper'>Minesweeper</Link>
            <Link className={routerLink} to='/contact'>Contact</Link>
          </ul>
        </nav>


        <Switch>

          {/* <Route path='/blog'>
            <Blog globalStyles={globalStyles} />
          </Route> */}

          <Route path='/minesweeper'>
            <Minesweeper globalStyles={globalStyles} />
          </Route>

          <Route path='/contact'>
            <Contact globalStyles={globalStyles} />
          </Route>

          <Route path='/'>
            <Home globalStyles={globalStyles} admin={admin}/>
          </Route>
        </Switch>

        <AdminForm handleAdminChange={handleAdminChange} handleAdminSubmit={handleAdminSubmit} admin={admin} adminPass={adminPass} />

        {/* <Mouse mouseLocation={mousePosition} /> */}
      </Router>
    // </div>

  )
}