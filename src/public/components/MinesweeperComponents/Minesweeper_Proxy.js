import React from "react";
import AppUtils from "../AppRouterComponents/AppUtils";
const { mobileBrowserFunction } = AppUtils;

import "../../main-styles/global.scss";
import "./minesweeperStyles.scss";

export const Minesweeper_Proxy = ({ game }) => {
  const [isIPad, setIsIPad] = React.useState(false);
  const [mobileBrowser, setMobileBrowser] = React.useState(false);

  React.useEffect(() => {
    setMobileBrowser(!!mobileBrowserFunction());
  }, []);

  React.useEffect(() => {
    if (navigator.userAgent.match(/iPad/i)) {
      setIsIPad(true);
    }
  }, []);

  return (
    <div
      className={
        mobileBrowser && !isIPad
          ? `minesweeper-proxy-root minesweeper-proxy-root--Mobile`
          : `minesweeper-proxy-root`
      }
    >
      <div
        className={`container websiteMinesweeperAdjust`}
        id="minesweeper-root"
      >
        {game}
      </div>
    </div>
  );
};
