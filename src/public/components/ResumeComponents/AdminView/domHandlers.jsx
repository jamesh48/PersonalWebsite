import React, { useRef, useState } from 'react';
import ResumeNameLI from './ActiveResumeLI.jsx'
// import { handleChange, handleSubmit } from './eventHandlers.js';

// module.exports = {
// handlePlaceHolders: (title) => {
//   title = title.split('_');
//   return title.join(' ')
// },

let exports = {}

exports.ResumeNameUL = ({ resume, name, resumeNames, patchActiveResumeCallback, postResumeCallback }) => {

  const handleResumeNameLIS = () => {
    if (resumeNames.length) {
      return resumeNames.map((resumeName, index) => {
        return <ResumeNameLI key={index} resume={resume} resumeName={resumeName} resumeCallback={patchActiveResumeCallback} />
      });
    }
  }

  return (
    <ul className={'resumeNameUL'} key={0}>
      <ResumeNameLI resumeName={'Post New Resume'} resumeCallback={postResumeCallback} />
      {handleResumeNameLIS()}
    </ul>
  )
};

exports.AdminEditContainer = ({ currentInputEl, index, breadth, depth, placeholder, temp, handleChange, handleSubmit, parentBreadth, parentDepth }) => {
  // const { titleRow, sectionRow, detailRow, minorRow, highlightsRow, flexRowContainer, editingInputs, inputForm } = style;

  const handleDepthPlaceholder = (depth) => {
    return depth === 0 ? 'New Title' : depth === 1 ? 'New Section' : depth === 3 ? 'New Minor Detail' : depth === 4 ? 'Highlights Title' : depth === 5 ? 'Highlights Detail' : null;
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

exports.AdminDisplayContainer = ({ containerRef, index, depth, handleClick, displayItem, breadth, parentBreadth }) => {

  const handleClassName = (depth) => {
      return depth === 0 ? `${'flexRowTitle'} ${'flexRowSmallTitle'}` : `flexRowTitle`
  }

  return (
    <div onClick={handleClick} ref={containerRef} key={index} className={handleClassName(depth)} data-depth={depth} data-breadth={breadth} data-parentbreadth={parentBreadth}>
      <h6 className={'titles'}>{displayItem}</h6>
    </div>
  )
}

export default exports;