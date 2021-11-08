import React from "react";
import ReactDOM from "react-dom";
import { Minesweeper_Proxy } from "./components/MinesweeperComponents/Minesweeper_Proxy.js";

ReactDOM.hydrate(
  <Minesweeper_Proxy />,
  document.getElementById("minesweeper-root")
);
