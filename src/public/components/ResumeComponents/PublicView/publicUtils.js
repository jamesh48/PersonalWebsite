import React from 'react';
import iterateContainers from './iterateContainers.js';
import { useGlobalContext } from 'GlobalStore';
import { useResumeContext } from 'ResumeStore';

import '../resume.scss';

export default (props) => {

  const [{ mobileBrowser }] = useGlobalContext();
  const [{ }, resumeDispatch] = useResumeContext();

  const { resumeData, resume: { resume_Details: csrResume } } = props;

  const displayedResume = resumeData?.length ? resumeData[0][0].resume_Details : csrResume;

  return (
    <div className='resumeUIContainer' onMouseLeave={_ => resumeDispatch({type: 'EXIT HOVER PARAMS'})}>
      {iterateContainers({ ...props, resumeDetails: displayedResume })}
    </div>
  )
};