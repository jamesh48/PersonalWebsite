import React, { useEffect } from 'react';

import useScript from './customHook.jsx';
import '../../main-styles/global.scss';
import './minesweeperStyles.scss';

export default ({game, mobileBrowser}) => {


  return (
    <div className={mobileBrowser ? `minesweeper-proxy-root minesweeper-proxy-root--Mobile` : `minesweeper-proxy-root`} >
      <div className={`container websiteMinesweeperAdjust`} id='minesweeper-root'>

        {game}

      </div>
    </div>
  );
};

{/* {useScript('http://static.fullstackhrivnak.com/mines/build/public/public-bundle.js')} */ }
