import React, { useState, useEffect } from 'react';
import PublicContainers from './publicUtils.js';


export default (props) => {
  return (
    <div className={'resumeContainer'}>
      <h4 className={'resumeContainerTitle'}>Resume {/*resume.resume_Name*/}</h4>
      <PublicContainers {...props}/>
    </div>
  )
};