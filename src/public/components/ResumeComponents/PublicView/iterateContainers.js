import React, { useRef, useState, useEffect } from 'react';
import DetailContainer from './Containers/DetailContainer.js';
import PublicDisplayContainer from './PublicDisplayContainer.js';
import hFCN from './handleFadingClassNames.js';
// import { useEffectOnlyOnUpdate } from '../../PortfolioComponents/PublicView/publicViewPortfolioUtils.js';
import { useEffectOnlyOnUpdate } from 'GlobalUtils';
import AppUtils from '../../AppRouterComponents/AppUtils.js';
import { useResumeContext } from 'ResumeStore';



export default (props) => {
  const [{ hoverParams: [hoverDepth, hoverBreadth] }, resumeDispatch] = useResumeContext();


  const handleHover = (indicator) => {
    if (indicator === 'exit') return resumeDispatch({ type: 'EXIT HOVER PARAMS', payload: [null, null] })

    let { target: { dataset: { depth, breadth, name } } } = event;

    // The first condition prevents details from disappearing momentarily when the user hovers downards over the border between the section title and the details
    // The second condition ensures that when the user goes to a new title, that the UI shows it, as there is no data-depth of publicColumnContainer between section and details but there is a data-depth in the empty space.
    if (event.target.className === 'publicColumnContainer' && !event.target.dataset.depth) return;

    // Setting hoverDepth------------------->
    let newHoverParams = [].concat(Number(depth));

    // setting hoverBreadth----------------->
    if (depth === '0') return resumeDispatch({ type: 'UPDATE HOVER PARAMS', payload: newHoverParams.concat(Number(breadth)) });

    if (depth === '1' || event.target.className === 'publicColumnContainer') {
      return resumeDispatch({ type: 'UPDATE HOVER PARAMS', payload: newHoverParams.concat(breadth) });
    };
  };

  const { resumeDetails, mobileBrowser } = props;
  const [hoverDebouncer, setHoverDebouncer] = useState(true);
  const [touchStartPosition, setTouchStartPosition] = useState(null);
  const prevTitle = useRef();
  const loadedSections = useRef();
  const defaultParams = { ...props, prevTitle, hoverDebouncer, hoverDepth, hoverBreadth, handleHover, loadedSections };


  useEffectOnlyOnUpdate(() => {
    if (hoverDepth === 1) {
      setHoverDebouncer(false);

      setTimeout(() => {
        setHoverDebouncer(true)
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [hoverBreadth])

  return resumeDetails.reduce((resultTitles, title, titleIndex) => {
    return resultTitles.concat(
      <div className='resumeParentContainer'>
        {/* Iterating at 0th depth */}
        <div className={
          hFCN({ existing: `publicContainerRow publicParentContainerRow`, itrDepth: 0, hoveredIndex: titleIndex, ...defaultParams })}
          onMouseOver={(!mobileBrowser && hoverDebouncer) ? handleHover : null}
          onTouchStart={() => {
            // Title Level
            if (mobileBrowser) {
              setTouchStartPosition(window.scrollY);
            }
          }}
          onTouchEnd={() => {
            if (mobileBrowser) {
              // if user is scrolling don't run...
              if (touchStartPosition !== window.scrollY) {
                return;
              }
              handleHover()
            }
          }}
        >

          {
            // For now mobile browser wont have this animation
            // Regular View...
            (!prevTitle.current || (hoverDepth || hoverBreadth || hoverBreadth === 0) || mobileBrowser) ?
              (

                <>
                  <div className={`publicColumnContainerTitle`}>
                    <PublicDisplayContainer
                      key={titleIndex}
                      displayItem={title?.title || ''}
                      breadth={titleIndex}
                      depth={0}
                    />
                  </div>
                  <div
                    className='publicColumnContainer'
                    data-breadth={titleIndex}
                    data-depth={1}
                    onMouseOver={(!mobileBrowser && hoverDebouncer) ? handleHover : null}
                    onTouchStart={() => {
                      if (mobileBrowser) {
                        setTouchStartPosition(window.scrollY);
                      };
                    }}
                    onTouchEnd={() => {
                      if (mobileBrowser) {
                        if (touchStartPosition !== window.scrollY) {
                          return;
                        }
                        handleHover()
                      }
                    }}
                  >
                    {
                      hoverBreadth === titleIndex
                        || (typeof hoverBreadth === 'string' && Number(hoverBreadth[0]) === titleIndex)
                        ?
                        iterateSections({ touchStartPosition: touchStartPosition, sections: title.detail, titleIndex, ...defaultParams })
                        : null
                    }
                  </div>

                </>
              )

              :
              // Disappearing Sections!
              ((!hoverDepth || !hoverBreadth) && hoverBreadth !== 0) ?
                (
                  <>
                    < div className={`publicColumnContainerTitle ${prevTitle?.current?.dataset?.titleindex === String(titleIndex) ? 'collapseTitleContainer' : null}`}>
                      <PublicDisplayContainer
                        key={titleIndex}
                        displayItem={title?.title || ''}
                        breadth={titleIndex}
                        depth={0}
                      />
                    </div>
                    <div
                      className='publicColumnContainer'
                      data-breadth={titleIndex}
                      data-depth={1}
                      onMouseOver={(!mobileBrowser && hoverDebouncer) ? handleHover : null}
                      onTouchEnd={mobileBrowser ? handleHover : null}
                    >
                      {
                        prevTitle?.current?.dataset?.titleindex === String(titleIndex) ?
                          iterateDisappearingSections({ sections: title.detail, titleIndex, ...defaultParams }) : null

                      }
                    </div>
                  </>
                )
                : null
          }



        </div>
      </div >
    );
  }, []);
}

const iterateDisappearingSections = (props) => {
  console.log(props.prevTitle.current)
  const { sections } = props;
  return sections.reduce((resultSections, section, sectionIndex) => {
    const hoveredIndex = `${props.titleIndex}_${props.sectionIndex}`
    return resultSections.concat(
      <div className={`resumeParentContainer faderContainerSection`}>
        <div className={hFCN({ existing: `publicContainerRow publicChildContainerRow`, itrDepth: 1, hoveredIndex, ...props })}>
          <div className='publicColumnContainerSection'>
            <PublicDisplayContainer
              key={sectionIndex}
              displayItem={section?.title || ''}
              depth={1}
            />
          </div>
        </div>
      </div>
    )
  }, [])
}


const iterateSections = (props) => {
  let { touchStartPosition, mobileBrowser, handleHover, titleIndex, sections, hoverBreadth, prevTitle, hoverDebouncer, loadedSections } = props;
  return sections.reduce((resultSections, section, sectionIndex) => {

    const hoveredIndex = `${titleIndex}_${sectionIndex}`;

    return resultSections.concat(
      <div className='resumeParentContainer' ref={prevTitle} data-titleindex={titleIndex}>
        <div className={hFCN({ existing: `publicContainerRow publicChildContainerRow`, itrDepth: 1, hoveredIndex: hoveredIndex, ...props })}
          onMouseOver={(!mobileBrowser && hoverDebouncer) ? handleHover : null}
          onTouchEnd={() => {
            if (mobileBrowser) {
              if (touchStartPosition !== window.scrollY) {
                return;
              }
              handleHover();
            }
          }
          }
        >
          <div className='publicColumnContainerSection'>
            <PublicDisplayContainer
              key={sectionIndex}
              displayItem={section?.title || ''}
              breadth={hoveredIndex}
              depth={1}
            />
          </div>
          {hoveredIndex === hoverBreadth
            || (Number(hoverBreadth[0]) === titleIndex && Number(hoverBreadth[2]) === sectionIndex) ?
            (
              <div>
                <div className='publicColumnContainer'>
                  {iterateDetails({ details: section.detail, hoveredIndex: hoveredIndex, ...props })}
                </div>
                <div className={hFCN({ existing: `minorContainer`, hoveredIndex: hoveredIndex, itrDepth: 2, ...props })} ref={loadedSections} data-dex={sectionIndex}>
                  <h5 className='minorContainerTitle'>{section.highlightDetail[0]?.title || ''}</h5>
                  <div className='minorHighlights'>
                    {iterateHighlights(section.highlightDetail.slice(1))}
                  </div>
                </div>
              </div>
              // This section of the code makes the text disappear animation style, to remove simply replace with (: null)
            ) : loadedSections.current?.dataset.dex === String(sectionIndex) && (props.hoverDepth === 1 || props.hoverDepth === 0) ? (
              <div className='faderContainer'>
                <div className='publicColumnContainer'>
                  {iterateDetails({ details: section.detail, hoveredIndex: hoveredIndex, ...props }, 'cancel')}
                </div>
                <div className='minorContainer'>
                  <h5 className='minorContainerTitle'>{section.highlightDetail[0]?.title || ''}</h5>
                  <div className='minorHighlights'>
                    {iterateHighlights(section.highlightDetail.slice(1))}
                  </div>
                </div>
              </div>
            ) : null

          }
        </div>
      </div >
    )
  }, []);
}

const iterateDetails = (props, ind) => {
  const { details, hoveredIndex, mobileBrowser, prevTitle } = props;
  return details.reduce((resultDetails, detail, detailIndex) => {
    return resultDetails.concat(
      <DetailContainer
        detail={detail}
        detailIndex={detailIndex}
        ind={ind}
        hoveredIndex={hoveredIndex}
        mobileBrowser={mobileBrowser}
        prevTitle={prevTitle}
      />
    )
  }, []);


}

const iterateHighlights = (highlights) => {
  return highlights.reduce((resultHighlights, highlight, highlightIndex) => {
    return resultHighlights.concat(
      <span className='minorItem'>{highlight?.title || ''}</span>
    )
  }, [])

};