import React, { useState, useEffect, useLayoutEffect, useCallback, useReducer, useRef } from 'react';
import './home.scss';
import '../../main-styles/global.scss';
import MarqueeContainer from '../MarqueeComponents/PublicView/MarqueeContainer.js';
import FloatingButtons from './Home_Components/FloatingButtons.js';
import Portfolio from '../PortfolioComponents/PublicView/Portfolio.js';
import AdminPortfolio from '../PortfolioComponents/AdminView/AdminPortfolio.js';
import Utils from '../AppRouterComponents/AppUtils.js';
const { debounce } = Utils;
import Resume from '../ResumeComponents/Resume.js';
import HomeUtils from './homeUtils.js';
// const { handleHover } = HomeUtils;
import { useSelector, useDispatch } from 'react-redux';


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

  const hoverDepth = useSelector((state) => {
    return state.hoverParams[0]
  });
  const hoverBreadth = useSelector((state) => state.hoverParams[1]);
  const dispatchHoverParams = useDispatch();

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

  // const [hoverParams, dispatchHoverParams] = useReducer(hoverParamsReducer, [null, null]);

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


  // cursor: useEffect(() => {
  //   if (mobileBrowser) {
  //     window.removeEventListener("mousemove", handleMouseMove, true);
  //     // If it exists remove it, if it doesn't exist (initial page load), skip...
  //     if (document.getElementById('cursor')) {
  //       document.getElementById('cursor').remove();
  //     }
  //   } else {
  //     window.addEventListener("mousemove", handleMouseMove, true);
  //   };
  // }, [mobileBrowser]);



  debounce: useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
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

  }, []);

  const handleHover = useCallback((indicator) => {
    if (indicator === 'exit') return dispatchHoverParams({ type: 'FULL', payload: [null, null] })

    let { target: { dataset: { depth, breadth, name } } } = event;

    // The first condition prevents details from disappearing momentarily when the user hovers downards over the border between the section title and the details
    // The second condition ensures that when the user goes to a new title, that the UI shows it, as there is no data-depth of publicColumnContainer between section and details but there is a data-depth in the empty space.
    if (event.target.className === 'publicColumnContainer' && !event.target.dataset.depth) return;

    // Setting hoverDepth------------------->
    let newHoverParams = [].concat(Number(depth));

    // setting hoverBreadth----------------->
    if (depth === '0') return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(Number(breadth)) });

    if (depth === '1' || event.target.className === 'publicColumnContainer') {
      return dispatchHoverParams({ type: 'FULL', payload: newHoverParams.concat(breadth) });
    }
  }, [])

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



      <div data-name='Resume' id='resume-root' className='container'>
        <Resume
          smallWindow={smallWindow}
          mobileBrowser={mobileBrowser}
          handleHover={handleHover}
          hoverDepth={hoverDepth}
          hoverBreadth={hoverBreadth}
          {...props}
        />
        {(floatingButtonsPlacement === 'resume-root' && mobileBrowser === false) ? <FloatingButtons /> : null}
      </div>

      <div data-name='Portfolio' className='container' id='portfolio-root'>
        {
          !props.admin ?
            <><Portfolio {...props} smallWindow={smallWindow} mobileBrowser={mobileBrowser} />

              {floatingButtonsPlacement === 'portfolio-root' && mobileBrowser === false ? <FloatingButtons indicator={true} /> : null}
            </>
            : <AdminPortfolio {...props} />
        }


      </div>
    </div >
  );
}