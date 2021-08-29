import React, { useRef, useState } from 'react';
import ResumeNameLI from './ActiveResumeLI.jsx'
// import { handleChange, handleSubmit } from './eventHandlers.js';

// module.exports = {
// handlePlaceHolders: (title) => {
//   title = title.split('_');
//   return title.join(' ')
// },

let exports = {}

exports.ResumeNameUL = ({ resume, name, resumeNames, patchActiveResumeCallback, postResumeCallback, style, style: { resumeNameUL } }) => {

  const handleResumeNameLIS = () => {
    if (resumeNames.length) {
      return resumeNames.map((resumeName, index) => {
        return <ResumeNameLI key={index} style={style} resume={resume} resumeName={resumeName} resumeCallback={patchActiveResumeCallback} />
      });
    }
  }

  return (
    <ul className={'resumeNameUL'} key={0}>
      <ResumeNameLI style={style} resumeName={'Post New Resume'} resumeCallback={postResumeCallback} />
      {handleResumeNameLIS()}
    </ul>
  )
};

exports.AdminEditContainer = ({ currentInputEl, index, style, breadth, depth, placeholder, temp, handleChange, handleSubmit, parentBreadth, parentDepth }) => {
  const { titleRow, sectionRow, detailRow, minorRow, highlightsRow, flexRowContainer, editingInputs, inputForm } = style;

  const handleDepthPlaceholder = (depth) => {
    if (depth === 0) {
      return 'New Title';
    }

    if (depth === 1) {
      return 'New Section';
    }

    if (depth === 2) {
      return 'New Detail';
    }

    if (depth === 3) {
      return 'New Minor Detail'
    }

    if (depth === 4) {
      return 'Highlights Title'
    }

    if (depth === 5) {
      return 'Highlights Detail'
    }
  }

  return (
    <div className={depth === 0 ? `${'titleRow'}` : depth === 1 ? `${'sectionRow'}` : depth === 2 ? `${'detailRow'}` : depth === 3 ? `${'minorRow'}` : (depth === 4 || depth === 5) ? `${'highlightsRow'}` : null}>
      <form className={'inputForm'} data-depth={depth} data-parentbreadth={parentBreadth} data-parentdepth={parentDepth} data-breadth={breadth} onSubmit={handleSubmit}>
        <input autoFocus className={'editingInputs'} data-depth={depth} data-parentbreadth={parentBreadth} data-parentdepth={parentDepth} data-temp={temp} data-breadth={breadth} placeholder={handleDepthPlaceholder(depth)} value={temp} type='text' onChange={handleChange} />
        <input className={'editingInputs'} data-depth={depth} data-breadth={breadth} type='submit' value='Confirm'></input>
      </form>
    </div>
  )
};

exports.AdminDisplayContainer = ({ containerRef, index, depth, handleClick, displayItem, style, breadth, parentBreadth }) => {

  const handleClassName = (depth) => {
    if (depth === 0) {
      return `${'flexRowTitle'} ${'flexRowSmallTitle'}`;
    } else {
      return 'flexRowTitle';
    }
  }

  return (
    <div onClick={handleClick} ref={containerRef} key={index} className={handleClassName(depth)} data-depth={depth} data-breadth={breadth} data-parentbreadth={parentBreadth}>
      <h6 className={'titles'}>{displayItem}</h6>
    </div>
  )
}

export default exports;