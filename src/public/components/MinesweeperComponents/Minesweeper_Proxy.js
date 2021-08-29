import React from 'react';

import useScript from './customHook.jsx';
import '../../main-styles/global.scss';
import './minesweeperStyles.scss';

export default () => {
  useScript('https://beatminesweeper.app/bundle.js');
  return (
    <div className={`${'container'} ${'websiteMinesweeperAdjust'}`} id='minesweeper-root'>
    </div>
  );
};
