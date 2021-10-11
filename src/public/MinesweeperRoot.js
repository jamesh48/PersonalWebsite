import React from 'react';
import ReactDOM from 'react-dom';
import Minesweeper from './components/MinesweeperComponents/Minesweeper_Proxy.js';

ReactDOM.hydrate(<Minesweeper game={window.__INITIAL__DATA__.game}/>, document.getElementById('minesweeper-root'));
