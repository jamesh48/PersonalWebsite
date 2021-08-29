import React from 'react';
import ReactDOM from 'react-dom';
import Minesweeper from './components/MinesweeperComponents/Minesweeper_Proxy.js';
ReactDOM.hydrate(<Minesweeper />, document.getElementById('minesweeper-root'));
