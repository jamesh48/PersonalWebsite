import React, { useState, useEffect } from 'react';
import PublicContainers from './publicUtils.jsx';


export default ({ mobileBrowser, handleHover, handleMobileResumeClick, hoverDepth, hoverBreadth, handleMouseCallback, style, resume: { resume_Details, resume_Name } }) => {
  return (
    <div className={'resumeContainer'}>
      <h4 className={'resumeContainerTitle'}>Resume</h4>
      <PublicContainers mobileBrowser={mobileBrowser} handleHover={handleHover} handleMobileResumeClick={handleMobileResumeClick} hoverDepth={hoverDepth} hoverBreadth={hoverBreadth} style={style} resumeDetails={resume_Details} />
    </div>
  )
}