import React, { useState, useEffect } from 'react';

import useScript from './customHook.jsx';
import '../../main-styles/global.scss';
import './minesweeperStyles.scss';
import { useEffectOnlyOnUpdate } from 'GlobalUtils';

export default ({ game, mobileBrowser }) => {

  return (
    <div className={mobileBrowser ? `minesweeper-proxy-root minesweeper-proxy-root--Mobile` : `minesweeper-proxy-root`} >
      <div className={`container websiteMinesweeperAdjust`} id='minesweeper-root'>
        {game ? game : <p>Loading...</p>}
      </div>
    </div>
  );
};


