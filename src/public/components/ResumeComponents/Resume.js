import React, { useState, useRef, useEffect } from 'react';
import utils from './utils.js';
const { getResume, patchResume, patchActiveResume, postResume } = utils;
import AdminResume from './AdminView/AdminResumeView.jsx';
import PublicResume from './PublicView/PublicResumeView.jsx';
import './resume.scss';

export default (props) => {
  const { admin } = props
  const [resume, setResume] = useState([]);
  const [resumeNames, setResumeNames] = useState('');
  const mounted = useRef(true);

  // Use Effect For Getting Resume
  useEffect(async () => {
    mounted.current = true;
    if (resumeNames.length > 0) {
      return;
    }

    const [[returningResume], returningResumeNames] = await getResume();
    if (mounted.current) {
      setResume(returningResume);
      setResumeNames(returningResumeNames);
    }

    return () => mounted.current = false;
  }, []);

  const postResumeCallback = async (resumeParams) => {
    const newResume = await postResume(resumeParams);
    setResume(newResume);
    setResumeNames((prevResumeNames) => {
      return [...prevResumeNames, newResume.resume_Name];
    })
  }

  const patchResumeCallback = async (patchParameters) => {
    const patched = await patchResume(patchParameters);
    setResume(patched);
  }

  const patchActiveResumeCallback = async (resume_Name) => {
    const activated = await patchActiveResume(resume_Name);
    setResume(activated);
  }

  const handleView = () => {
    return (!admin && resume?.resume_Name) ? (
      // Public View
      <PublicResume {...props} resume={resume} />
    ) : admin ? (
      <AdminResume resumeNames={resumeNames} resume={resume} patchResumeCallback={patchResumeCallback} patchActiveResumeCallback={patchActiveResumeCallback} postResumeCallback={postResumeCallback} />
    ) : null;
  };

  return (
    <div>
      {
        (!admin && resume?.resume_Name) ? (
          // Public View
          <PublicResume {...props} resume={resume} />
        ) : admin ? (
          <AdminResume resumeNames={resumeNames} resume={resume} patchResumeCallback={patchResumeCallback} patchActiveResumeCallback={patchActiveResumeCallback} postResumeCallback={postResumeCallback} />
        ) : null
      }
    </div>)
}


    // if (!admin) {
    //   return resume?.resume_Name ? (
    //     // Public View
    //     <PublicResume mobileBrowser={mobileBrowser} handleMobileResumeClick={handleMobileResumeClick} handleHover={handleHover} hoverDepth={hoverDepth} hoverBreadth={hoverBreadth} resume={resume} />
    //   ) : null
    // } else {
    //   return (
    //     <AdminResume resumeNames={resumeNames} resume={resume} patchResumeCallback={patchResumeCallback} patchActiveResumeCallback={patchActiveResumeCallback} postResumeCallback={postResumeCallback} />
    //   )
    // }