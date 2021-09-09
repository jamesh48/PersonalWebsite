import React, { useState, useEffect, useCallback } from 'react';
import './home.scss';
import '../../main-styles/global.scss';
import MarqueeContainer from './Home_Components/MarqueeSection.js';
import MarqueeButtons from './Home_Components/MarqueeButtons.js';
import Portfolio from '../PortfolioComponents/PublicView/Portfolio.js';
import AdminPortfolio from '../PortfolioComponents/AdminView/AdminPortfolio.js';
import Utils from '../../Utils.js';
const { handleMouseMove, mobileBrowserFunction, debounce } = Utils;
import Resume from '../ResumeComponents/Resume.js';
import UtilsTest from './utils/utils.js';
const { handleHover } = UtilsTest;
// import mobileBrowserFunction from './mobileBrowserUtil.js';


export default (props) => {
  const [dimensions, setDimensions] = useState({
    height: null,
    width: null
  })
  const [hoverParams, setHoverParams] = useState([null, null]);
  const [mobileBrowser, setMobileBrowser] = useState(false);
  const [smallWindow, setSmallWindow] = useState(false);
  const [marqueeButtonsPlacement, setMarqueeButtonsPlacement] = useState('about-me-root');

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

  set_mobile_browser: useEffect(() => {
    const mobileBrowserTest = mobileBrowserFunction();
    setMobileBrowser(!!mobileBrowserTest);
  }, []);

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

  const test = useCallback((indicator) => {
    const newHoverParams = handleHover(indicator, hoverParams[1]);
    setHoverParams(newHoverParams)
  });

  return (
    <div>
      <div id='about-me-root' data-name='About Me' className={'container'}>
        <MarqueeContainer
          smallWindow={smallWindow}
          mobileBrowser={mobileBrowser}
        />
        {
          marqueeButtonsPlacement === 'about-me-root' && !mobileBrowser ? (
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
          handleMobileResumeClick={test}
          handleHover={test}
          hoverDepth={hoverParams[0]}
          hoverBreadth={hoverParams[1]}
          {...props}
        />
        {
          marqueeButtonsPlacement === 'resume-root' && !mobileBrowser ?
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
            <Portfolio {...props} mobileBrowser={mobileBrowser} />
            : <AdminPortfolio {...props} />

        }


        {marqueeButtonsPlacement === 'portfolio-root' && !mobileBrowser ?
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