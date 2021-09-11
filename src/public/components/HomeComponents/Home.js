import React, { useState, useEffect, useCallback, useReducer } from 'react';
import './home.scss';
import '../../main-styles/global.scss';
import MarqueeContainer from './Home_Components/MarqueeSection.js';
import MarqueeButtons from './Home_Components/MarqueeButtons.js';
import Portfolio from '../PortfolioComponents/PublicView/Portfolio.js';
import AdminPortfolio from '../PortfolioComponents/AdminView/AdminPortfolio.js';
import Utils from '../../Utils.js';
const { handleMouseMove, mobileBrowserFunction, debounce } = Utils;
import Resume from '../ResumeComponents/Resume.js';
import HomeUtils from './utils/utils.js';
const { handleHover } = HomeUtils;

export default (props) => {

  const hoverParamsReducer = (state, action) => {
    switch (action.type) {
      case 'full':
        return action.payload;
      default:
        throw new Error();
    }
  };

  const [dimensions, setDimensions] = useState({
    height: null,
    width: null
  });

  const [hoverParams, dispatchHoverParams] = useReducer(hoverParamsReducer, [null, null]);
  const [mobileBrowser, setMobileBrowser] = useState(null);
  const [smallWindow, setSmallWindow] = useState(null);
  const [marqueeButtonsPlacement, setMarqueeButtonsPlacement] = useState('about-me-root');

  initial_page_render: useEffect(() => {
    // Initial Page Render is correct and doesn't wait for a resize to adjust.
    if (mobileBrowser === null) {
      // setDimensions({ height: window.innerHeight, width: window.innerWidth })
      setSmallWindow(() => window.innerWidth >= 1150 ? false : true)
    };
  }, []);

  set_mobile_browser: useEffect(() => {
    const mobileBrowserTest = mobileBrowserFunction();
    setMobileBrowser(!!mobileBrowserTest);
  }, []);


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



  // This useEffect moves the marqueebuttons depending on what element is in view.
  set_marquee_buttons: useEffect(() => {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setMarqueeButtonsPlacement(entry.target.id)
        }
      });
    }, { threshold: [.8] });

    observer.observe(document.querySelector('#about-me-root'));
    observer.observe(document.querySelector("#resume-root"));
    observer.observe(document.querySelector("#portfolio-root"));
  }, [])

  const onHandleHover = (indicator) => handleHover(indicator, hoverParams[1], dispatchHoverParams);

  return (
    <div>
      <div id='about-me-root' data-name='About Me' className={'container'}>
        <MarqueeContainer
          smallWindow={smallWindow}
          mobileBrowser={mobileBrowser}
        />
        {
          marqueeButtonsPlacement === 'about-me-root' && mobileBrowser === false ? (
            <div className='fader'>
              <MarqueeButtons />
              <hr className='marqueeButtonsHR' />
            </div>
          ) : null
        }
      </div>

      <div data-name='Resume' id='resume-root'
        className={'container'}>
        <Resume
          smallWindow={smallWindow}
          mobileBrowser={mobileBrowser}
          handleMobileResumeClick={onHandleHover}
          handleHover={onHandleHover}
          hoverDepth={hoverParams[0]}
          hoverBreadth={hoverParams[1]}
          {...props}
        />
        {
          marqueeButtonsPlacement === 'resume-root' && mobileBrowser === false ?
            (
              <div className='fader'>
                <MarqueeButtons />
                <hr className='marqueeButtonsHR' />
              </div>
            ) : null
        }
      </div>

      <div data-name='Portfolio' className='container' id='portfolio-root'>
        {
          !props.admin ?
            <Portfolio {...props} smallWindow={smallWindow} mobileBrowser={mobileBrowser} />
            : <AdminPortfolio {...props} />

        }


        {marqueeButtonsPlacement === 'portfolio-root' && mobileBrowser === false ?
          (
            <div className={'fader'}>
              <MarqueeButtons indicator={true} />
              <hr className='marqueeButtonsHR' />
            </div>
          ) : null
        }
      </div>
    </div >
  );
}