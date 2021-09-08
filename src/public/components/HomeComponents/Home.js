import React, { useState, useEffect } from 'react';
import './home.scss';
import '../../main-styles/global.scss';
import MarqueeContainer from './Home_Components/MarqueeSection.js';
import MarqueeButtons from './Home_Components/MarqueeButtons.js';
import Portfolio from '../PortfolioComponents/PublicView/Portfolio.js';
import AdminPortfolio from '../PortfolioComponents/AdminView/AdminPortfolio.js';
import Resume from '../ResumeComponents/Resume.js';
import mobileBrowserFunction from './mobileBrowserUtil.js';


function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}


export default (props) => {
  const [dimensions, setDimensions] = useState({
    height: null,
    width: null
  })
  const [hoverDepth, setHoverDepth] = useState(null);
  const [hoverBreadth, setHoverBreadth] = useState(null);
  const [mobileBrowser, setMobileBrowser] = useState(false);
  const [marqueeButtonsPlacement, setMarqueeButtonsPlacement] = useState('about-me-root');
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    if (mobileBrowser && document.getElementById('cursor')) {
      document.getElementById('cursor').remove();
    }
  }, [mobileBrowser]);

  useEffect(() => {
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
  })

  useEffect(() => {
    setMobileBrowser(() => dimensions.width >= 1150 ? false : true)
  }, [dimensions]);

  useEffect(() => {
    const mobileBrowserTest = mobileBrowserFunction();
    setMobileBrowser(!!mobileBrowserTest);
  }, []);

  // This useEffect moves the marqueebuttons depending on what element is in view.
  useEffect(() => {
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

  const handleMobileResumeClick = (event, indicator) => {
    if (indicator === 'exit') {
      setHoverDepth(null);
      setHoverBreadth(null);
      return;
    };

    const { target: { dataset: { depth, breadth, name } } } = event;

    // Setting hoverDepth------------------->
    if (depth) {
      setHoverDepth(Number(depth));
    }

    // setting hoverBreadth----------------->
    // hoverBreadth column-one
    if (depth === '0') {
      return setHoverBreadth(Number(breadth));
    };

    // hoverBreadth-> column-two
    if (depth === '1') {
      return setHoverBreadth((prevHoverBreadth) => {
        if (typeof prevHoverBreadth === 'number') {
          return `${prevHoverBreadth}_${breadth}`;
        } else {
          let prevHoverBreadthArr = prevHoverBreadth.split('_');
          if (prevHoverBreadthArr.length === 3) {
            prevHoverBreadthArr.pop();
          } else {
            prevHoverBreadthArr.splice(1, 1, breadth)
          };
          return prevHoverBreadthArr.join('_');
        };
      });
    };

    // hoverBreadth-> column-three
    if (depth === '2') {
      return setHoverBreadth((prevHoverBreadth) => {
        const prevHoverBreadthArr = prevHoverBreadth.split('_');
        if (prevHoverBreadthArr.length === 2) {
          return `${prevHoverBreadth}_${breadth}`;
        } else {
          const change = prevHoverBreadth.split('_');
          change.splice(depth, 1, breadth);
          return change.join('_');
        };
      });
    };

    return Number(depth);
  };




  const handleHover = (event, exit) => {
    if (exit === 'exit') {
      console.log('exiting');
      setHoverDepth(null);
      setHoverBreadth(null);
      return;
    }

    if (exit === 'prevSection') {
      setHoverDepth(1);
      setHoverBreadth((prevHoverBreadth) => {
        let update = Number(prevHoverBreadth.split('_')[0]) - 1;
        return `${update}_0`;
      });
    }

    if (exit === 'nextSection') {
      setHoverDepth(1);
      setHoverBreadth((prevHoverBreadth) => {
        if (prevHoverBreadth) {
          let update = Number(prevHoverBreadth.split('_')[0]) + 1;
          return `${update}_0`
        } else {
          return null;
        }
      })

      return;
    }

    const { target: { dataset: { depth, breadth, name } } } = event;

    if (depth) {
      setHoverDepth(Number(depth));
    }

    // hoverBreadth
    //Column One
    if (depth === '0') {
      setHoverBreadth(Number(breadth));
    }

    // Column Two
    if (depth === '1') {
      setHoverBreadth((prevHoverBreadth) => {
        if (typeof prevHoverBreadth === 'number') {
          return prevHoverBreadth + '_' + breadth;
        } else {
          let change = prevHoverBreadth.split('_');
          if (change.length === 3) {
            change.pop();
          } else {
            change.splice(1, 1, breadth)
          }
          return change.join('_');
        }
      });
    };

    if (depth === '2') {
      setHoverBreadth((prevHoverBreadth) => {
        const prevHoverBreadthArr = prevHoverBreadth.split('_');
        if (prevHoverBreadthArr.length === 2) {
          return prevHoverBreadth + '_' + breadth;
        } else {
          const change = prevHoverBreadth.split('_');
          change.splice(depth, 1, breadth);
          return change.join('_');
        }
      });
    }
    return Number(depth);
  }

  return (
    <div>
      <div id='about-me-root' data-name='About Me' className={'container'}>
        <MarqueeContainer mobileBrowser={mobileBrowser} />
        {
          marqueeButtonsPlacement === 'about-me-root' && !mobileBrowser ? (
            <div className={'fader'}>
              <MarqueeButtons />
              <hr className='marqueeButtonsHR' />
            </div>
          ) : null
        }
      </div>

      <div data-name='Resume' id='resume-root'
        className={'container'}>
        <Resume
          mobileBrowser={mobileBrowser}
          handleMobileResumeClick={handleMobileResumeClick}
          handleHover={handleHover}
          hoverDepth={hoverDepth}
          hoverBreadth={hoverBreadth}
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