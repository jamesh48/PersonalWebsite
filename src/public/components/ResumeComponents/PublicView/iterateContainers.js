import React, { useRef, useState, useEffect } from 'react';
import PublicDisplayContainer from './PublicDisplayContainer.js';
import hFCN from './handleFadingClassNames.js';
import Utils from '../../PortfolioComponents/PublicView/publicViewPortfolioUtils.js';
import AppUtils from '../../AppRouterComponents/AppUtils.js';
const { useEffectOnlyOnUpdate } = Utils;


export default (props) => {
  const { resumeDetails, mobileBrowser, handleHover, hoverBreadth, hoverDepth } = props;
  const [hoverDebouncer, setHoverDebouncer] = useState(true);
  const prevTitle = useRef();
  const loadedSections = useRef();
  const defaultParams = { ...props, prevTitle, hoverDebouncer, loadedSections };


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
          onTouchEnd={mobileBrowser ? handleHover : null}
        >

          {
            // For now mobile browser wont have this animation
            (!prevTitle.current || (hoverDepth || hoverBreadth) || mobileBrowser) ?
              (

                <>
                  <div className={`publicColumnContainerTitle`}>
                    <PublicDisplayContainer
                      key={titleIndex}
                      displayItem={title.title}
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
                      hoverBreadth === titleIndex
                        || (typeof hoverBreadth === 'string' && Number(hoverBreadth[0]) === titleIndex)
                        ?
                        iterateSections({ sections: title.detail, titleIndex, ...defaultParams })
                        : null
                    }
                  </div>

                </>
              )

              :
              (!hoverDepth || !hoverBreadth) ?
                (
                  <>
                    < div className={`publicColumnContainerTitle ${prevTitle?.current?.dataset?.titleindex === String(titleIndex) ? 'collapseTitleContainer' : null}`}>
                      <PublicDisplayContainer
                        key={titleIndex}
                        displayItem={title.title}
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
              displayItem={section.title}
              depth={1}
            />
          </div>
        </div>
      </div>
    )
  }, [])
}


const iterateSections = (props) => {
  let { mobileBrowser, handleHover, titleIndex, sections, hoverBreadth, prevTitle, hoverDebouncer, loadedSections } = props;
  return sections.reduce((resultSections, section, sectionIndex) => {

    const hoveredIndex = `${titleIndex}_${sectionIndex}`;

    return resultSections.concat(
      <div className={`resumeParentContainer`} ref={prevTitle} data-titleindex={titleIndex}>
        <div className={hFCN({ existing: `publicContainerRow publicChildContainerRow`, itrDepth: 1, hoveredIndex: hoveredIndex, ...props })}
          onMouseOver={(!mobileBrowser && hoverDebouncer) ? handleHover : null}
          onTouchEnd={mobileBrowser ? handleHover : null}
        >
          <div className='publicColumnContainerSection'>
            <PublicDisplayContainer
              key={sectionIndex}
              displayItem={section.title}
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
                  <h5 className='minorContainerTitle'>{section.highlightDetail[0].title}</h5>
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
                  <h5 className='minorContainerTitle'>{section.highlightDetail[0].title}</h5>
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
  const { details, hoveredIndex } = props;
  return details.reduce((resultDetails, detail, detailIndex) => {
    return resultDetails.concat(
      <div className='resumeParentContainer'>
        <div className={ind ? '' : hFCN({ existing: '', itrDepth: 2, ...props })}>
          <div className='publicColumnContainerDetail'>
            <PublicDisplayContainer
              key={detailIndex}
              displayItem={detail.title}
              breadth={hoveredIndex}
              depth={1}
            />
          </div>
        </div>
      </div>
    )
  }, []);
}

const iterateHighlights = (highlights) => {
  return highlights.reduce((resultHighlights, highlight, highlightIndex) => {
    return resultHighlights.concat(
      <span className='minorItem'>{highlight.title}</span>
    )
  }, [])

};