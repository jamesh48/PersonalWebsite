import React, { useState, useEffect } from 'react';
import PublicDisplayContainer from './PublicDisplayContainer.jsx';
import HighlightContainer from './HighlightContainer.js';
import '../resume.scss';


const handleDepthClassNames = (depth, mobileBrowser) => {
  let str = '';
  str += depth === 0 ? 'publicColumnContainerTitle' : depth === 1 ? 'publicColumnContainerSection' : depth === 2 ? 'publicColumnContainerDetail' : 'publicColumnContainer';
  return (mobileBrowser && depth === 0) ? str += ' responsiveMobileColumnContainer' : str;
};

const handleFadingClassNames = (depth, hoverDepth, hoverBreadth, currentIndex, mobileBrowser) => {
  let test;

  if (hoverDepth === null) return 'publicContainerRow' + ' ' + mobileBrowser ? 'publicResponsiveRowX' : 'publicContainerRowX';

  if (hoverBreadth || hoverBreadth === 0) {
    test = typeof hoverBreadth === 'number' ? hoverBreadth : hoverBreadth.split('_');
  }

  if (
    (hoverDepth >= depth)
    &&
    (
      (typeof test === 'number' && depth === 0 && currentIndex !== test)
      ||
      (Array.isArray(test) && depth === 0 && currentIndex !== Number(test[0]))
      || (Array.isArray(test) && depth === 1 && currentIndex !== Number(test[1]))
    )

  ) {

    let className = (depth === 0 || depth === 1) ? `${'publicContainerRow'} ${'faderOuter'}` : 'faderOuter';
    if (depth === 0) {
      className += ' ' + 'publicParentContainerRow';
    }

    if (depth === 1) {
      className += ' ' + 'publicChildContainerRow'
    }

    if (depth === 3) {
      className += ' ' + 'publicFinalContainerRow';
      className += ' ' + 'faderOuter';
    }
    return className;
  } else {
    let className = (depth === 0 || depth === 1) ? `${'publicContainerRow'} ${'fader'}` : 'fader';

    if (depth === 0) {
      className += ' ' + 'publicParentContainerRow';
    }

    if (depth === 1) {
      className += ' ' + 'publicChildContainerRow'
    }

    if (depth === 3) {
      className += ' ' + 'publicFinalContainerRow';
      className += ' ' + 'fader';
    }
    return className;
  }
}

const highlightContainers = (...args) => args[0].length ? <HighlightContainer highlights={args} /> : null;

const recurseContainers = ({ resumeDetails, mobileBrowser, hoverDepth, hoverBreadth, handleHover, handleMobileResumeClick, depth, prevIndex }) => {

  return resumeDetails?.map((currentItem, currentIndex, currentArr) => {
    let currentContainerArr = [];

    currentContainerArr.push(
      <PublicDisplayContainer
        key={currentIndex}
        depth={depth}
        breadth={currentIndex}
        displayItem={currentItem.title}
      />
    );


    const breadthArr = typeof hoverBreadth !== 'number' ? hoverBreadth?.split('_') : [hoverBreadth];

    let highlightDetails = [];
    let recursed = [];

    if (
      currentItem.detail &&
      breadthArr?.length &&
      ((hoverDepth === depth && currentIndex === Number(breadthArr[breadthArr.length - 1])) ||
        (hoverDepth > depth && currentIndex === Number(breadthArr[depth])))
    ) {

      highlightDetails = currentItem['highlightDetail'] ? highlightContainers(currentItem['highlightDetail'], currentItem['highlightDetail'][0]) : null


      const nextProps = {
        resumeDetails: currentItem.detail,
        depth: depth + 1,
        hoverDepth: hoverDepth,
        hoverBreadth: hoverBreadth,
        handleHover: handleHover,
        handleMobileResumeClick: handleMobileResumeClick,
        prevIndex: !currentArr[currentIndex + 1] || currentIndex === 0 ? currentIndex : null,
        mobileBrowser: mobileBrowser
      };

      recursed = recurseContainers(nextProps);
    };

    return [
      <div key={currentIndex} className='resumeParentContainer'>

        <div
          data-depth={depth}

          onMouseDown={_ => mobileBrowser ? handleMobileResumeClick(event) : null}
          onMouseOver={_ => !mobileBrowser ? handleHover(event) : null}

          onMouseLeave={() => {
            if (mobileBrowser) return;
            if (
              (
                // If hovering downwards from one section to the next...
                depth === 1 && hoverDepth === 2 && !currentArr[Number(hoverBreadth.split('_')[1]) + 1])
              ||
              // // This condition provides for the occasional case where the next section isn't triggered automatically by hovering downwards...
              depth === 0 && hoverDepth === 1 && currentArr[Number(hoverBreadth.split('_')[0]) + 1]
            ) {
              return handleHover(event, 'nextSection');
            };

            // This condition triggers the previous section if hovering upwards...
            if (depth === 1 && hoverDepth === 1 && currentIndex === 0) return handleHover(event, 'prevSection');
          }}
          className={handleFadingClassNames(depth, hoverDepth, hoverBreadth, currentIndex, mobileBrowser)}
        >
          <div
            className={handleDepthClassNames(depth, mobileBrowser)}
          >
            {currentContainerArr}
          </div>

          {
            depth < 2 ?
              <div className='publicColumnContainer'>
                {recursed}
              </div> : null
          }
          {highlightDetails}
        </div>
      </div>
    ];
  });
}

export default (props) => {
  const { handleHover, handleMobileResumeClick, mobileBrowser, resumeData, resume: { resume_Details: csrResume } } = props;

  const displayedResume = resumeData?.length ? resumeData[0][0].resume_Details : csrResume;

  return (
    <div className='resumeUIContainer' onMouseLeave={_ => mobileBrowser ? handleMobileResumeClick(event, 'exit') : handleHover(event, 'exit')}>
      {recurseContainers({ ...props, resumeDetails: displayedResume, depth: 0, prevIndex: 0 })}
    </div>
  )
}