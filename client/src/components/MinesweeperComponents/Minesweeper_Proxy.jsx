import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';


console.log(__dirname)
import axios from 'axios';
import useScript from './customHook.jsx';
import globalStyles from '../../main-styles/global.scss';


export default ({ globalStyles: { container } }) => {
  // useScript('https://beatminesweeper.app/bundle.js');
  useScript('http://localhost:3500/bundle.js')

  return (
    <div className={`${container}`} id='minesweeper-root'>
    </div>
  )
}