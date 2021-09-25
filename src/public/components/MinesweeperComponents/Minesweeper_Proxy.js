import React, { useState, useEffect } from 'react';

import useScript from './customHook.jsx';
import '../../main-styles/global.scss';
import './minesweeperStyles.scss';
import { useEffectOnlyOnUpdate } from 'GlobalUtils';

export default ({ game, mobileBrowser }) => {
  let [leaderboard, setLeaderboard] = useState(null);
  let [toggled, setToggled] = useState(false);

  useEffectOnlyOnUpdate(() => {
    if (!leaderboard || toggled) {
      if (!leaderboard) {
        setLeaderboard(document.getElementById('leaderboard'));
      }
      document.getElementById('leaderboard').remove();
    } else if (!toggled) {
      return document.querySelector('.minesweeper-proxy-root--Mobile').appendChild(leaderboard)
    }
  }, [toggled])


  return (
    <div className={mobileBrowser ? `minesweeper-proxy-root minesweeper-proxy-root--Mobile` : `minesweeper-proxy-root`} >
      <div className={`container websiteMinesweeperAdjust`} id='minesweeper-root'>

        {game}

      </div>
      {
        mobileBrowser ?
          <button onClick={() => { setToggled(x => !x) }}>{!toggled ? 'remove leaderboard' : 'add leaderboard'}</button> : null
      }
    </div>
  );
};

{/* {useScript('http://static.fullstackhrivnak.com/mines/build/public/public-bundle.js')} */ }
