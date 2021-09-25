import React, { useState, useEffect } from 'react';
import PublicContainers from './publicUtils.js';
import { useGlobalContext } from 'GlobalStore';

export default (props) => {
  const [{ mobileBrowser }] = useGlobalContext();

  return (
    <div className={(mobileBrowser || props.smallWindow) ? `resumeContainer resumeContainer--Mobile` : `resumeContainer`}>
      <h4 className='resumeContainerTitle'>Resume {/*resume.resume_Name*/}</h4>
      <PublicContainers {...props} />
    </div>
  )
};