import React, { useState, useEffect, useCallback } from "react";
import "./home.scss";
import "../../main-styles/global.scss";

import { useGlobalContext } from "GlobalStore";
import { useHomeContext } from "HomeStore";
import { MarqueeContainer } from "../MarqueeComponents/PublicView/MarqueeContainer.js";
import { MarqueeStoreProvider } from "MarqueeStore";
import { PortfolioStoreProvider } from "PortfolioStore";
import AdminForm from "../AdminForm/AdminForm.js";
import { AdminFormStoreProvider } from "AdminFormStore";
import FloatingButtons from "./Home_Components/FloatingButtons.js";
import { Portfolio } from "../PortfolioComponents/PublicView/Portfolio.js";
import AdminPortfolio from "../PortfolioComponents/AdminView/AdminPortfolio.js";
import Utils from "../AppRouterComponents/AppUtils.js";
const { debounce } = Utils;
import Resume from "../ResumeComponents/Resume.js";

export const Home = (props) => {
  const [{ mobileBrowser, smallWindow, admin }, globalDispatch] =
    useGlobalContext();
  const [{ floatingButtonsPlacement }, homeDispatch] = useHomeContext();

  const [dimensions, setDimensions] = useState({
    height: null,
    width: null,
  });

  const [smileLoaded, setSmileLoaded] = useState(false);

  // Initial Page Render
  useEffect(() => {
    // Initial Page Render is correct and doesn't wait for a resize to adjust.
    if (mobileBrowser === null) {
      if (window.innerWidth >= 1150) {
        globalDispatch({ type: "TOGGLE SMALL WINDOW", payload: false });
      } else {
        globalDispatch({ type: "TOGGLE SMALL WINDOW", payload: true });
      }
    }
  }, []);

  // Debounce
  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 500);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  useEffect(() => {
    const initPortraitTest = window.matchMedia('(orientation: portrait)');
    if (initPortraitTest.matches) {
      globalDispatch({type: 'SET PORTRAIT'})
    } else {
      globalDispatch({type: 'UNSET PORTRAIT'})
    }
  }, []);

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(orientation: portrait)');
    mediaQueryList.addEventListener('change', (event) => {
      const portraitMode = event.matches;
      if (portraitMode) {
        globalDispatch({type: 'SET PORTRAIT'});
      } else {
        globalDispatch({type: 'UNSET PORTRAIT'});
      }
    })
  }, [])

  // Window Resize
  useEffect(() => {
    if (dimensions.width) {
      if (window.innerWidth >= 1150) {
        globalDispatch({ type: "TOGGLE SMALL WINDOW", payload: false });
      } else {
        globalDispatch({ type: "TOGGLE SMALL WINDOW", payload: true });
      }
    }
  }, [dimensions]);

  // This useEffect moves the floatingButtons depending on what element is in view.
  // Set Marquee Buttons
  useEffect(() => {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            homeDispatch({
              type: "UPDATE FLOATING BUTTONS",
              payload: entry.target.id,
            });
          }
        });
      },
      { threshold: [1] }
    );

    observer.observe(document.querySelector("#about-me-root"));
    observer.observe(document.querySelector("#resume-root"));
    observer.observe(document.querySelector("#portfolio-root"));

    return () => {
      observer.disconnect();
    };
  }, []);

  const smileCallback = useCallback(() => {
    setSmileLoaded(true);
  });

  return (
    <div className={mobileBrowser ? "homeContainer--Mobile" : "homeContainer"}>
      <div id={smallWindow ? `about-me-root--Small` : `about-me-root`} data-name="About Me" className="container">
        <MarqueeStoreProvider>
          <MarqueeContainer smileCallback={smileCallback} />
        </MarqueeStoreProvider>
        {floatingButtonsPlacement === "about-me-root" &&
        mobileBrowser === false &&
        smileLoaded ? (
          <FloatingButtons />
        ) : null}
      </div>

      <AdminFormStoreProvider>
        <AdminForm />
      </AdminFormStoreProvider>

      <div data-name="Resume" id="resume-root" className="container">
        <Resume
          smallWindow={smallWindow}
          mobileBrowser={mobileBrowser}
          {...props}
        />
        {floatingButtonsPlacement === "resume-root" &&
        mobileBrowser === false ? (
          <FloatingButtons />
        ) : null}
      </div>

      <div data-name="Portfolio" className="container" id="portfolio-root">
        {!admin ? (
          <PortfolioStoreProvider>
            <Portfolio portfolioJSON={props.portfolioJSON} />

            {floatingButtonsPlacement === "portfolio-root" &&
            mobileBrowser === false ? (
              <FloatingButtons indicator={true} />
            ) : null}
          </PortfolioStoreProvider>
        ) : (
          <AdminPortfolio {...props} />
        )}
      </div>
    </div>
  );
};
