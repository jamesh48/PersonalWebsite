import React, { useState, useEffect } from 'react';
import iterateContainers from './iterateContainers.js';
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
      className += ' ' + 'publicChildContainerRow';
    }

    if (depth === 3) {
      className += ' ' + 'publicFinalContainerRow';
      className += ' ' + 'faderOuter';
    }
    return className;
  } else {
    let className = (depth === 0 || depth === 1) ? `${'publicContainerRow'} ${'fader'}` : 'fader';

    if (depth === 0) {
      className += ' ' + 'publicParentContainerRow ' + 'activeHighlightedContainer';
    }

    if (depth === 1) {
      className += ' ' + 'publicChildContainerRow';
      if (typeof hoverBreadth === 'string') {
        className += ' ' + 'activeHighlightedContainer';
      }
    }

    if (depth === 3) {
      className += ' ' + 'publicFinalContainerRow';
      className += ' ' + 'fader';
    }
    return className;
  }
}

export default (props) => {


  const { handleHover, mobileBrowser, resumeData, resume: { resume_Details: csrResume } } = props;

  const displayedResume = resumeData?.length ? resumeData[0][0].resume_Details : csrResume;

  return (
    <div className='resumeUIContainer' onMouseLeave={_ => mobileBrowser ? handleHover('exit') : handleHover('exit')}>
      {iterateContainers({ ...props, resumeDetails: displayedResume })}
    </div>
  )
};