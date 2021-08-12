import React, { useState, useEffect } from 'react';
import PublicDisplayContainer from './PublicDisplayContainer.jsx';
import style from '../resume.scss';


const { publicContainerRow, publicParentContainerRow, publicChildContainerRow, publicFinalContainerRow, publicColumnContainer, publicColumnContainerTitle, publicColumnContainerSection, publicColumnContainerDetail, niceContainer, minorContainer, minorContainerTitle, minorHighlights, minorItem, fader, faderOuter, publicContainerRowX, publicResponsiveRowX, responsiveMobileColumnContainer } = style;

const handleDepthClassNames = (depth, mobileBrowser) => {
  let str = '';

  str += depth === 0 ? publicColumnContainerTitle : depth === 1 ? publicColumnContainerSection : depth === 2 ? publicColumnContainerDetail : publicColumnContainer;

  if (mobileBrowser && depth === 0) {
    str += ' ' + responsiveMobileColumnContainer;
  }

  return str;
};

const handleFadingClassNames = (depth, hoverDepth, hoverBreadth, currentIndex, mobileBrowser) => {
  let test;

  if (hoverDepth === null) {
    return publicContainerRow + ' ' + mobileBrowser ? publicResponsiveRowX  : publicContainerRowX;
  }

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

    let className = (depth === 0 || depth === 1) ? `${publicContainerRow} ${faderOuter}` : faderOuter;
    if (depth === 0) {
      className += ' ' + publicParentContainerRow;
    }

    if (depth === 1) {
      className += ' ' + publicChildContainerRow
    }

    if (depth === 3) {
      className += ' ' + publicFinalContainerRow;
      className += ' ' + faderOuter;
    }
    return className;
  } else {
    let className = (depth === 0 || depth === 1) ? `${publicContainerRow} ${fader}` : fader;

    if (depth === 0) {
      className += ' ' + publicParentContainerRow;
    }

    if (depth === 1) {
      className += ' ' + publicChildContainerRow
    }

    if (depth === 3) {
      className += ' ' + publicFinalContainerRow;
      className += ' ' + fader;
    }
    return className;
  }
}

const highlightContainers = (highlightDetail, highlightTitle) => {
  return highlightDetail.length ?
    (
      <div className={minorContainer}>
        <h5 className={minorContainerTitle}>{highlightTitle.title}</h5>

        <div className={minorHighlights}>
          {highlightDetail.map((item) => {
            return (<span className={minorItem}>{item.title}</span>)
          }).slice(1)}
        </div>
      </div>
    ) : null
}

const recurseContainers = (inputArr, depth, hoverDepth, hoverBreadth, handleHover, handleResumeClick, prevIndex, mobileBrowser) => {

  return inputArr.map((currentItem, currentIndex, currentArr) => {
    let currentContainerArr = [];

    currentContainerArr.push(
      <PublicDisplayContainer
        handleHover={handleHover}
        hoverDepth={hoverDepth}
        key={currentIndex}
        displayItem={currentItem.title}
        depth={depth}
        breadth={currentIndex}
        style={style}
      />
    );

    let highlightDetails = [];
    let recursed;

    let breadthArr;
    if (typeof hoverBreadth !== 'number') {
      breadthArr = hoverBreadth?.split('_');
    } else {
      breadthArr = [hoverBreadth];
    }

    if (
      currentItem.detail &&
      breadthArr?.length &&
      ((hoverDepth === depth && currentIndex === Number(breadthArr[breadthArr.length - 1])) ||
        (hoverDepth > depth && currentIndex === Number(breadthArr[depth])))
    ) {
      if (currentItem['highlightDetail']) {
        highlightDetails = highlightContainers(currentItem['highlightDetail'], currentItem['highlightDetail'][0]);
      };

      recursed = recurseContainers(currentItem.detail, depth + 1, hoverDepth, hoverBreadth, handleHover, handleResumeClick, !currentArr[currentIndex + 1] || currentIndex === 0 ? currentIndex : null, mobileBrowser);
    }

    return [
      <div className={niceContainer}>

        <div
          data-depth={depth}

          onMouseDown={() => {
            if (!mobileBrowser) return;
            handleResumeClick(event);
          }}
          onMouseOver={() => {
            if (mobileBrowser) return;
            handleHover(event);
          }}

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
            if (depth === 1 && hoverDepth === 1 && currentIndex === 0) {
              return handleHover(event, 'prevSection');
            };
          }}

          className={handleFadingClassNames(depth, hoverDepth, hoverBreadth, currentIndex, mobileBrowser)}
        >
          <div
            className={handleDepthClassNames(depth, mobileBrowser)} data-depthman={depth}
          >
            {currentContainerArr}
          </div>

          {depth < 2 ?
            <div className={publicColumnContainer}>
              {recursed}
            </div> : null
          }
          {highlightDetails}

        </div>
      </div>
    ];
  });
}

export default ({ resumeDetails, handleHover, handleResumeClick, hoverDepth, hoverBreadth, mobileBrowser }) => {
  return (
    <div>
      {recurseContainers(resumeDetails, 0, hoverDepth, hoverBreadth, handleHover, handleResumeClick, 0, mobileBrowser)}
    </div>
  )
}