import React, { useState, useEffect } from 'react';
import PublicContainers from './publicUtils.jsx';


export default ({ handleMouseCallback, style, resume: { resume_Details, resume_Name } }) => {
  return (
    <div>
      <PublicContainers style={style} resumeDetails={resume_Details} />
    </div>
  )
}