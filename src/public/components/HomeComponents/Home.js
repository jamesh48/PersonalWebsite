import React, { useState, useEffect, useLayoutEffect, useCallback, useReducer, useRef } from 'react';
import './home.scss';
import '../../main-styles/global.scss';
import MarqueeContainer from '../MarqueeComponents/PublicView/MarqueeContainer.js';
import FloatingButtons from './Home_Components/FloatingButtons.js';
import Portfolio from '../PortfolioComponents/PublicView/Portfolio.js';
import AdminPortfolio from '../PortfolioComponents/AdminView/AdminPortfolio.js';
import Utils from '../AppRouterComponents/AppUtils.js';
const { handleMouseMove, debounce } = Utils;
import Resume from '../ResumeComponents/Resume.js';
import HomeUtils from './homeUtils.js';
const { handleHover } = HomeUtils;

export default (props) => {
  const { mobileBrowser } = props;
  const hoverParamsReducer = (state, action) => {
    switch (action.type) {
      case 'FULL':
        return action.payload;
      default:
        throw new Error();
    }
  };

  const floatingButtonsReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_FLOAT':
        return action.payload;
      default:
        throw new Error();
    }
  }

  const [dimensions, setDimensions] = useState({
    height: null,
    width: null
  });

  const [hoverParams, dispatchHoverParams] = useReducer(hoverParamsReducer, [null, null]);
  // const [mobileBrowser, setMobileBrowser] = useState(null);
  const [smallWindow, setSmallWindow] = useState(null);
  // const [floatingButtonsPlacement, setFloatingButtonsPlacement] = useState('');
  const [floatingButtonsPlacement, dispatchFloatingButtons] = useReducer(floatingButtonsReducer, '');
  const [smileLoaded, setSmileLoaded] = useState(false);


  initial_page_render: useEffect(() => {
    // Initial Page Render is correct and doesn't wait for a resize to adjust.
    if (mobileBrowser === null) {
      // setDimensions({ height: window.innerHeight, width: window.innerWidth })
      setSmallWindow(() => window.innerWidth >= 1150 ? false : true)
    };
  }, []);

  // set_mobile_browser: useEffect(() => {
  //   const mobileBrowserTest = mobileBrowserFunction();
  //   setMobileBrowser(!!mobileBrowserTest);
  // }, []);


  cursor: useEffect(() => {
    if (mobileBrowser) {
      window.removeEventListener("mousemove", handleMouseMove, true);
      // If it exists remove it, if it doesn't exist (initial page load), skip...
      if (document.getElementById('cursor')) {
        document.getElementById('cursor').remove();
      }
    } else {
      window.addEventListener("mousemove", handleMouseMove, true);
    };
  }, [mobileBrowser]);



  debounce: useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 500);

    window.addEventListener('resize', debouncedHandleResize);

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  window_resize: useEffect(() => {
    if (dimensions.width) {
      setSmallWindow(() => dimensions.width >= 1150 ? false : true)
    }
  }, [dimensions]);

  // This useEffect moves the floatingButtons depending on what element is in view.
  set_marquee_buttons: useEffect(() => {

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          dispatchFloatingButtons({ type: 'UPDATE_FLOAT', payload: entry.target.id });
        }
      });
    }, { threshold: [1] });

    observer.observe(document.querySelector('#about-me-root'))
    observer.observe(document.querySelector("#resume-root"));
    observer.observe(document.querySelector("#portfolio-root"));

    return () => { observer.disconnect() }

  }, [])

  const onHandleHover = (indicator) => handleHover(indicator, hoverParams[1], dispatchHoverParams);

  const smileCallback = useCallback(() => {
    setSmileLoaded(true);
  });

  return (
    <div className={mobileBrowser ? 'homeContainer--Mobile' : 'homeContainer'}>
      <div id='about-me-root' data-name='About Me' className='container'>
        <MarqueeContainer
          smallWindow={smallWindow}
          mobileBrowser={mobileBrowser}
          smileCallback={smileCallback}
        />
        {(floatingButtonsPlacement === 'about-me-root' && mobileBrowser === false && smileLoaded) ? <FloatingButtons /> : null}
      </div>



      <div data-name='Resume' id='resume-root'
        className='container'>
        <Resume
          smallWindow={smallWindow}
          mobileBrowser={mobileBrowser}
          handleMobileResumeClick={onHandleHover}
          handleHover={onHandleHover}
          hoverDepth={hoverParams[0]}
          hoverBreadth={hoverParams[1]}
          {...props}
        />
        {(floatingButtonsPlacement === 'resume-root' && mobileBrowser === false) ? <FloatingButtons /> : null}
      </div>

      <div data-name='Portfolio' className='container' id='portfolio-root'>
        {
          !props.admin ?
            <Portfolio {...props} smallWindow={smallWindow} mobileBrowser={mobileBrowser} />
            : <AdminPortfolio {...props} />
        }

        {(floatingButtonsPlacement === 'portfolio-root' && mobileBrowser === false) ? <FloatingButtons indicator={true} /> : null}
      </div>
    </div >
  );
}