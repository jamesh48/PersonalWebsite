import React, { useState, useEffect } from 'react';
import PublicContainers from './publicUtils.jsx';


export default ({ mobileBrowser, handleHover, handleResumeClick, hoverDepth, hoverBreadth, handleMouseCallback, style, resume: { resume_Details, resume_Name } }) => {
  return (
    <div>
      <PublicContainers mobileBrowser={mobileBrowser} handleHover={handleHover} handleResumeClick={handleResumeClick} hoverDepth={hoverDepth} hoverBreadth={hoverBreadth} style={style} resumeDetails={resume_Details} />
    </div>
  )
}