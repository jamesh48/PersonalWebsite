import React from 'react';

import useScript from './customHook.jsx';
import '../../main-styles/global.scss';
import './minesweeperStyles.scss';

export default () => {
  useScript('https://d1y3bjxf7c78hf.cloudfront.net/build/public/public-bundle.js');
  return (
    <div className={`${'container'} ${'websiteMinesweeperAdjust'}`} id='minesweeper-root'>
    </div>
  );
};
