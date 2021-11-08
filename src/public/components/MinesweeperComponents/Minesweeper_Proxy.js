import React from 'react';
import '../../main-styles/global.scss';
import './minesweeperStyles.scss';

export const Minesweeper_Proxy = ({ game, mobileBrowser }) => {
  const [isIPad, setIsIPad] = React.useState(false);

  React.useEffect(() => {
    if (navigator.userAgent.match(/iPad/i)) {
      setIsIPad(true)
    }
  }, [])

  return (
    <div className={mobileBrowser && !isIPad ? `minesweeper-proxy-root minesweeper-proxy-root--Mobile` : `minesweeper-proxy-root`} >
      <div className={`container websiteMinesweeperAdjust`} id='minesweeper-root'>
        {game ? <div>{game}</div> : <p className='loading-indicator'>Loading...</p>}
      </div>
    </div>
  );
};


