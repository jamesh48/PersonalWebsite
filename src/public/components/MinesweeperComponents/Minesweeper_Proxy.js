import React, { useEffect } from 'react';

import useScript from './customHook.jsx';
import '../../main-styles/global.scss';
import './minesweeperStyles.scss';

export default (props) => {


  return (
    <div className={`${'container'} ${'websiteMinesweeperAdjust'}`} id='minesweeper-root'>

      {props.game}

    </div>
  );
};

{/* {useScript('http://static.fullstackhrivnak.com/mines/build/public/public-bundle.js')} */ }
