import React, { useState, useEffect } from "react";
import { useGlobalContext } from "GlobalStore";
import { Link, Route, Switch } from "react-router-dom";

import Contact from "../ContactComponents/Contact.js";
import { Minesweeper_Proxy } from "../MinesweeperComponents/Minesweeper_Proxy.js";
import { Home } from "../HomeComponents/Home.js";
import { HomeStoreProvider } from "HomeStore";
import { handleMouseMove, mobileBrowserFunction, useEffectOnlyOnUpdate } from "GlobalUtils";

import "../../main-styles/cursor.css";
import "../../main-styles/reset.scss";
import "../../main-styles/global.scss";
import "../../main-styles/main.scss";

const AppRouter = (props) => {
  const [{ mobileBrowser }, globalDispatch] = useGlobalContext();
  const [admin] = useState(false);

  // Set Mobile Browser
  React.useEffect(() => {
    const mobileBrowserTest = mobileBrowserFunction();
    globalDispatch({
      type: "TOGGLE MOBILE BROWSER",
      payload: !!mobileBrowserTest,
    });
  }, [admin]);

  // Cursor
  // Only on update prevents two events listeners from being added on initial render
  useEffectOnlyOnUpdate(() => {
    if (mobileBrowser) {
      window.removeEventListener("mousemove", handleMouseMove, true);
      // If it exists remove it, if it doesn't exist (initial page load), skip...
      if (document.getElementById("cursor")) {
        document.getElementById("cursor").remove();
      }
    } else {
      window.addEventListener("mousemove", handleMouseMove, true);
    }
  }, [mobileBrowser]);

  return (
    <>
      <nav
        className={mobileBrowser ? `headerNav headerNav--Mobile` : "headerNav"}
      >
        <ul>
          <a className="routerLink" href="/">
            Home
          </a>
          <a className="routerLink" href="/fullstack/minesweeper">
            Minesweeper
          </a>
          <Link className="routerLink" to="/fullstack/contact">
            Contact
          </Link>
        </ul>
      </nav>

      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomeStoreProvider>
              <Home {...props} />
            </HomeStoreProvider>
          )}
        />
        <Route
          path="/fullstack/minesweeper"
          render={() => (
            <Minesweeper_Proxy
              mobileBrowser={mobileBrowser}
            />
          )}
        />
        <Route
          path="/fullstack/contact"
          render={() => <Contact mobileBrowser={mobileBrowser} />}
        />
      </Switch>
    </>
  );
};

export default AppRouter;
