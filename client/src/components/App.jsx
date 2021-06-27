import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './HomeComponents/Home.jsx';
import Blog from './BlogComponents/Blog.jsx';
import Resume from './ResumeComponents/Resume.jsx';
import Portfolio from './PortfolioComponents/Portfolio.jsx'
import Contact from './ContactComponents/Contact.jsx';
import '../styles/reset.scss';
import style from '../styles/main.scss';
const {routerLink} = style;

export default () => {
  return (
    <Router>
      <nav>
        <ul>
            <Link className={routerLink} to='/'>Home</Link>
            <Link className={routerLink} to='/blog'>Blog</Link>
            <Link className={routerLink} to='/resume'>Resume</Link>
            <Link className={routerLink} to='/portfolio'>Portfolio</Link>
            <Link className={routerLink} to='/contact'>Contact</Link>
        </ul>
      </nav>

      <Switch>

        <Route path='/blog'>
          <Blog />
        </Route>

        <Route path='/resume'>
          <Resume />
        </Route>

        <Route path='/portfolio'>
          <Portfolio />
        </Route>

        <Route path='/contact'>
          <Contact />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}